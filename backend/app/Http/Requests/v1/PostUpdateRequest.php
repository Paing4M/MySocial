<?php

namespace App\Http\Requests\v1;

use Illuminate\Foundation\Http\FormRequest;

class PostUpdateRequest extends FormRequest {
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
      'desc' => 'required',
      'image' => 'image|mimes:png,svg,jpg,jpeg,gif,webp|max:2048'
    ];
  }


  public function messages(): array {
    return [
      'desc.required' => 'Description field is required.',
    ];
  }
}
