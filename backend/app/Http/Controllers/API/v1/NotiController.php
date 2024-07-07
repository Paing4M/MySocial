<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\NotiResource;
use Illuminate\Http\Request;

class NotiController extends Controller {
  public function __invoke(Request $request) {

    $user = $request->user('sanctum');
    $noti = $user->notifications()->latest()->paginate(10);

    // $c = Comment::where('id', '1')->with('user')->get();
    return NotiResource::collection($noti);
  }
}
