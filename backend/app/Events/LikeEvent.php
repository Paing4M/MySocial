<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LikeEvent implements ShouldBroadcastNow {
  use Dispatchable, InteractsWithSockets, SerializesModels;

  /**
   * Create a new event instance.
   */

  public $user_id, $post_id, $type;


  public function __construct($user_id,  $post_id, $type) {
    $this->user_id = $user_id;
    $this->post_id = $post_id;
    $this->type = $type;
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
    return [
      'data' => [
        'user_id' => $this->user_id,
        'post_id' => $this->post_id,
        'type' => $this->type
      ]
    ];
  }
}
