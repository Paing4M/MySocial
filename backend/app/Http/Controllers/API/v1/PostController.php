<?php

namespace App\Http\Controllers\API\v1;

use App\Events\PostCreateEvent;
use App\Events\PostDeleteEvent;
use App\Events\PostUpdateEvent;
use App\Events\TestEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\v1\PostStoreRequest;
use App\Http\Requests\v1\PostUpdateRequest;
use App\Http\Resources\v1\PostResource;
use App\Models\Post;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller implements HasMiddleware {

  public static function middleware(): array {
    return [
      new Middleware('auth:sanctum', except: ['index']),
    ];
  }

  public function index(Request $request) {

    $posts = Post::query()
      ->when($request->searchTerm, function ($q) use ($request) {
        $q->where('desc', 'LIKE', '%' . $request->searchTerm . '%');
      })
      ->when($request->user, function ($q) use ($request) {
        $q->where('user_id', $request->user);
      })
      ->withCount('comments')
      ->withCount('likes')
      ->with(['comments.user:id,name,profile_img,bio'])
      ->orderByDesc('created_at')
      ->paginate(20);

    // return response()->json($posts);
    return PostResource::collection($posts);
  }


  public function store(PostStoreRequest $request) {
    $payload  = $request->only(['desc', 'image']);
    $user = $request->user('sanctum');
    $payload['user_id'] = $user->id;

    if (isset($payload['image'])) {
      $filename = $payload['image']->store('post_images');
      $payload['image'] = $filename;
    }

    $post =  Post::create($payload)->with('user')->orderByDesc('created_at')->first();



    broadcast(new PostCreateEvent($post));

    return response()->json([
      'message' => 'Post created successfully.',
      'post' => $post,
      'status' => 201
    ], 201);
  }


  public function show(string $id) {
    try {
      $post = Post::where('id', $id)->withCount('comments')
        ->withCount('likes')
        ->with(['comments.user:id,name,profile_img,bio'])->first();
      return new PostResource($post);
    } catch (ModelNotFoundException $e) {
      return response()->json([
        'message' => 'Post not found.',
      ], 404);
    }
  }


  public function update(PostUpdateRequest $request, string $id) {
    $post =  Post::findOrFail($id);
    $payload = $request->only(['desc', 'image']);

    if (isset($payload['image'])) {
      if (isset($post->image) && Storage::exists($post->image)) {
        Storage::delete($post->image);
      }

      $filename = $payload['image']->store('post_images');
      $payload['image'] = $filename;
    }

    $post->desc = $payload['desc'];
    $post->image = $payload['image'] ?? $post->image;
    $post->save();


    broadcast(new PostUpdateEvent($post));


    return response()->json([
      'message' => 'Post updated successfully.',
      'post' => $post,
      'status' => 200
    ], 200);
  }

  public function destroy(string $id) {
    $post = Post::findOrFail($id);

    if (isset($post->image) && Storage::exists($post->image)) {
      Storage::delete($post->image);
    }
    $post->delete();

    broadcast(new PostDeleteEvent($id));

    return response()->json([
      'status' => 200,
      'message' => 'Post deleted successfully.'
    ]);
  }
}
