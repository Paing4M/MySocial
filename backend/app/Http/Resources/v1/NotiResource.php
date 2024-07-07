<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotiResource extends JsonResource {
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array {
    return [
      'post_id' => $this->data['post_id'],
      'title' => $this->data['title'],
      'user' => [
        'name' => $this->data['user']['name'],
        'profile_img' => $this->data['user']['profile_img'],

      ],
      'created_at' => $this->created_at
    ];
  }
}
