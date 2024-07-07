<?php

use App\Events\TestEvent;
use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\CommentController;
use App\Http\Controllers\API\v1\LikeController;
use App\Http\Controllers\API\v1\NotiController;
use App\Http\Controllers\API\v1\PostController;
use App\Http\Controllers\API\v1\ProfileController;


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

  // noti
  Route::get('/user-noti', NotiController::class)->middleware('auth:sanctum');
  Route::delete('/user-noti-delete', [NotiController::class, 'destory'])->middleware('auth:sanctum');
});

Route::post('/test', function (Request $request) {
  $user = $request->user('sanctum');
  $noti = $user->notifications()->get();

  // $c = Comment::where('id', '1')->with('user')->get();
  return $noti;
});


Broadcast::routes(['middleware' => ['auth:sanctum']]);
