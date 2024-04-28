<?php

use App\Events\TestEvent;
use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\CommentController;
use App\Http\Controllers\API\v1\LikeController;
use App\Http\Controllers\API\v1\PostController;
use App\Http\Controllers\API\v1\ProfileController;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
  return $request->user();
})->middleware('auth:sanctum');



Route::prefix('v1')->group(function () {
  // auth
  Route::post('register', [AuthController::class, 'register']);
  Route::post('login', [AuthController::class, 'login']);
  Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

  // profile
  Route::post('update-profile', [ProfileController::class, 'updateProfile'])->middleware('auth:sanctum');

  Route::apiResources([
    'posts' => PostController::class, // post routes
  ]);

  // comment
  Route::post('/comments', [CommentController::class, 'store'])->middleware('auth:sanctum');

  // like
  Route::post('/add-like', [LikeController::class, 'addLike'])->middleware('auth:sanctum');
});

Route::post('/test', function () {
  $post = Post::latest()->first();
  broadcast(new TestEvent($post));
  // $c = Comment::where('id', '1')->with('user')->get();
  return 'done';
});


Broadcast::routes(['middleware' => ['auth:sanctum']]);
