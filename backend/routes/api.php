<?php

use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
  return $request->user();
})->middleware('auth:sanctum');


Route::get('test', function () {
  return 'test';
});


Route::prefix('v1')->group(function () {

  // auth
  Route::post('register', [AuthController::class, 'register']);
  Route::post('login', [AuthController::class, 'login']);
  Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

  // profile
  Route::post('update-profile', [ProfileController::class, 'updateProfile'])->middleware('auth:sanctum');
});
