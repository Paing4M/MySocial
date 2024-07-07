<?php

namespace App\Http\Controllers\API\v1;

use App\Events\LikeEvent;
use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use App\Notifications\LikeNotification;
use Illuminate\Http\Request;

class LikeController extends Controller {
  public function addLike(Request $request) {
    $user = $request->user('sanctum');
    $exist = Like::where('user_id', $user->id)->where('post_id', $request->post_id)->first();

    if ($exist) {
      broadcast(new LikeEvent($exist->user_id, $request->post_id, 'unLike'));
      $exist->delete();
      return response()->json([
        'status' => '200',
        'message' => 'Post unLiked successfully.'
      ]);
    } else {
      $like = Like::create(['user_id' => $user->id, 'post_id' => $request->post_id]);
      broadcast(new LikeEvent($like->user_id, $request->post_id, 'like'));

      $post = Post::find($request->post_id);
      $postUser = User::find($post->user->id);

      $title = $user->name . ' liked your post.';
      $postUser->notify(new LikeNotification($title, $post, $user));

      return response()->json([
        'status' => '201',
        'message' => 'Post  liked successfully.'
      ]);
    }
  }
}
