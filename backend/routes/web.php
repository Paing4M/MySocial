<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
  return response()->json([
    'title' => 'MySocial',
    'laravel_version' => app()->version(),
  ]);
});
