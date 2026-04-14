<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreproductsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_name' => 'nullable|string|max:255',
            'manufacturer_name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'product_price' => 'nullable|string|max:255',
            'model_number' => 'nullable|string|max:255',
            'part_number' => 'required|string|max:255',
            'availability' => 'nullable|string|max:255',
            'condition' => 'required|string|max:255',        
            'description' => 'nullable|string|max:1024',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:10240',
             
        ];
    }
}
