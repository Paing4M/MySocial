<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\NotiResource;
use Illuminate\Http\Request;

class NotiController extends Controller {
  public function __invoke(Request $request) {

    $user = $request->user('sanctum');
    $noti = $user->notifications()->where('data->user->id', '!=', auth('sanctum')->user()->id)->latest()->paginate(10);

    return NotiResource::collection($noti);
  }

  public function destory(Request $request) {

    $user = $request->user('sanctum');
    $user->notifications()->delete();
    return response()->json([
      'status' => '200',
      'message' => 'Notifications deleted successfully.'
    ]);
  }
}
