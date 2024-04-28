<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource {
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array {
    return [
      'id' => $this->id,
      'desc' => $this->desc,
      'image' => $this->image,
      'user' => $this->user,
      'comments' => $this->comments,
      'likes' => $this->likes,
      'comment_count' => $this->comments_count,
      'like_count' => $this->likes_count,
      'liked_by_user' => $this->liked_by_user,
      'created_at' => $this->created_at
    ];
  }
}
