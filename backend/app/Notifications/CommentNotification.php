<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CommentNotification extends Notification implements ShouldBroadcast {
  use Queueable;


  public $post, $title, $user;

  /**
   * Create a new notification instance.
   */
  public function __construct($title, $post, $user) {
    $this->title = $title;
    $this->post = $post;
    $this->user = $user;
  }

  /**
   * Get the notification's delivery channels.
   *
   * @return array<int, string>
   */
  public function via(object $notifiable): array {
    return ['broadcast', 'database'];
  }


  /**
   * Get the broadcastable representation of the notification.
   */
  public function toBroadcast(object $notifiable): BroadcastMessage {

    $notification = [
      'data' => [
        'post_id' => $this->post->id,
        'title' => $this->title,
        'user' => $this->user
      ]
    ];

    return new BroadcastMessage($notification);
  }


  /**
   * Get the array representation of the notification.
   *
   * @return array<string, mixed>
   */
  public function toArray(object $notifiable): array {
    return [
      'title' => $this->title,
      'post_id' => $this->post->id,
      'user' => $this->user
    ];
  }
}
