<?php

namespace App\Http\Requests\v1;

use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest {
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array {
    return [
      'bio' => 'max:300',
      'profile_img' => 'image|mimes:png,svg,jpg,jpeg,gif,webp|max:2048'
    ];
  }

  public function messages() {
    return [
      'profile_img.image' => 'The profile avatar field must be an image.',
      'profile_img.max' => 'The profile avatar field must not be greater than 2048 kilobytes.',
      'profile_img.mimes' => 'The profile avatar field must be a file of type: png, svg, jpg, jpeg, gif, webp.',
    ];
  }
}
