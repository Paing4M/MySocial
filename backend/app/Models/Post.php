<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Post extends Model {
  use HasFactory, HasUuids;

  protected $fillable = ['desc', 'image', 'user_id'];

  protected $table = 'posts';

  public function user(): BelongsTo {
    return $this->belongsTo(User::class, 'user_id')->select('id', 'name',  'profile_img', 'bio');
  }

  public function comments(): HasMany {
    return $this->hasMany(Comment::class)->select('id', 'comment', 'user_id', 'post_id', 'created_at')->orderByDesc('created_at');
  }


  public function likes(): HasMany {
    return $this->hasMany(Like::class)->select('user_id', 'post_id');
  }


  public function getLikedByUserAttribute() {
    if (auth('sanctum')->user()) {
      return $this->likes()->where('user_id',  auth('sanctum')->user()->id)->exists();
    } else {
      return false;
    }
  }
}
