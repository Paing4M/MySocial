<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller {
  public function updateProfile(Request $request) {
    $payload = $request->only(['name', 'profile_img', 'bio']);
    $validator = Validator::validate($payload, [
      'bio' => 'max:100',
      'profile_img' => 'image|mimes:png,svg,jpg,jpeg,gif,webp|max:2048'
    ]);

    $user = User::where('id', $request->user('sanctum')->id)->first();

    if (isset($payload['profile_img'])) {
      if (isset($user->profile_img) && Storage::exists($user->profile_img)) {
        Storage::delete($user->profile_img);
      }

      $filename = $payload['profile_img']->store('profile_imgs_' . $user->id);

      $payload['profile_img'] = $filename;
      $user->profile_img = $filename;
      $user->save();
    }

    $user->name = $payload['name'] ?? $user->name;
    $user->bio = $payload['bio'] ?? $user->bio;
    $user->save();

    return response()->json([
      'status' => 200,
      'message' => 'User profile updated successfully.',
      'user' => $user
    ]);
  }
}
