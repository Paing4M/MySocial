<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\Comment;
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

    $comment = Comment::create($payload)->orderByDesc('created_at')->first();

    return response()->json([
      'message' => 'Comment added successfully.',
      'status' => '201',
      'comment' => $comment
    ], 201);
  }
}
