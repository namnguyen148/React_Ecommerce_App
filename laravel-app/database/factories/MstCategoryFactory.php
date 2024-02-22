<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MstCategory>
 */
class MstCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categoryNames = [
            'Thời trang Nam',
            'Thời trang Nữ',
            'Phụ kiện & Trang Sức',
            'Mẹ & Bé',
            'Làm Đẹp & Sức Khỏe',
        ];
    
        static $index = 0;
        $categoryName = $categoryNames[$index];

        $index = ($index + 1) % count($categoryNames);
    
        return [
            'name' => $categoryName,
            'parent' => 0,
        ];
    }
}
