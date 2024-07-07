<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\LoginRequest;
use App\Http\Requests\v1\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller {
  public function register(RegisterRequest $request) {
    $payload = $request->only([
      'name',
      'email',
      'password',
      'password_confirmation'
    ]);

    $user = User::create($payload);

    return response()->json([
      'message' => 'Account register successfully.',
      'user' => $user
    ]);
  }

  public function login(LoginRequest $request) {
    $credentials = $request->only(['email', 'password']);
    $user = User::where('email', $request->email)->first();
    if (!$user | !auth()->attempt($credentials)) {
      return response()->json([
        'errors' => ['incorrect' => ['Password or email is incorrect.']]
      ], 401);
    } else {
      $token = $user->createToken($user->name)->plainTextToken;
      $data = array_merge($user->toArray(), ['token' => $token]);

      return response()->json([
        'message' => 'Login successfully.',
        'data' => $data,
      ]);
    }
  }

  public function logout(Request $request) {
    $request->user()->currentAccessToken()->delete();

    return response()->json([
      'status' => 200,
      'message' => 'Logout successfully.'
    ]);
  }
}
