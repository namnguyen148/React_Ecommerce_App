<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
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
        if(request()->isMethod('post')) {
            return [
                'product_name' => 'required|string|max:255',
                'product_price' => 'required|numeric',
                'is_sales' => 'required|in:0,1',
                'product_image' => 'image|mimes:jpeg,png,jpg|dimensions:max_width=1024,max_height=1024',
                'description' => 'string',
            ];
        } 
        return [];
    }

    public function messages()
    {
        if(request()->isMethod('post')) {
            return [
                'product_name.required' => 'Product Name is required!',
                'product_price.required' => 'Product price is required!',
                'is_sales.required' => 'Status is required!'
            ];
        }
        return [];
    }
}
