<?php

namespace App\Events;

use App\Models\Post;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PostUpdateEvent implements ShouldBroadcastNow {
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $post;

  /**
   * Create a new event instance.
   */
  public function __construct($post) {
    $this->post = serialize($post);
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn(): array {

    return [
      new Channel('post_channel'),
    ];
  }

  public function broadcastWith() {
    $post = unserialize($this->post);

    return [
      'data' => $post
    ];
  }
}
