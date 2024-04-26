<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
}
