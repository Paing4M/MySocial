<?php

namespace App\Http\Controllers\API\v1;

use App\Events\PostCreateEvent;
use App\Events\TestEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\v1\PostStoreRequest;
use App\Http\Resources\v1\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PostController extends Controller implements HasMiddleware {

  public static function middleware(): array {
    return [
      new Middleware('auth:sanctum', except: ['index']),
    ];
  }

  public function index() {
    $posts = Post::orderByDesc('created_at')->paginate(20);
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
    //
  }


  public function update(Request $request, string $id) {
    //
  }

  public function destroy(string $id) {
    //
  }
}
