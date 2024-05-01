<?php

namespace App\Http\Controllers\API\v1;

use App\Events\CommentEvent;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use App\Notifications\CommentNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller {
  public function store(Request $request) {
    $payload = $request->only(['comment', 'post_id']);
    Validator::validate($payload, [
      'comment' => 'required'
    ]);

    $user = $request->user('sanctum');
    $payload['user_id'] = $user->id;

    $comment = Comment::create($payload)
      ->select(['id', 'comment', 'user_id', 'post_id',  'created_at'])->with('user:id,name,profile_img,bio')->orderByDesc('created_at')->first();

    broadcast(new CommentEvent($comment));

    $post = Post::find($payload['post_id']);
    $postUser = User::find($post->user->id);
    $title = $user->name . ' comment your post.';

    $postUser->notify(new CommentNotification($title, $post, $user));

    return response()->json([
      'message' => 'Comment added successfully.',
      'status' => '201',
      'comment' => $comment
    ], 201);
  }
}
