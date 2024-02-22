<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MstProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $productNames = [
            'Áo polo nam', // thời trang nam
            'Đầm dự tiệc', // thời trang nữ
            'Bông tai vàng 18k', //Phụ kiện & Trang sức
            'Bình sữa cho trẻ sơ sinh', // Mẹ & Bé
            'Kem chống nắng SPF 50', // Làm Đẹp & Sức Khỏe

            'Jacket nam', // thời trang nam
            'Áo thun nữ', // thời trang nữ
            'Ghế ăn cho trẻ em', //Phụ kiện & Trang sức
            'Máy massage em bé', // Mẹ & Bé
            'Son môi màu tự nhiên', // Làm Đẹp & Sức Khỏe

            'Quần jean nam', // Thời trang Nam
            'Áo crop top', // Thời trang Nữ
            'Dây chuyền vàng 24k', // Phụ kiện & Trang sức
            'Bình nước cho bé', // Mẹ & Bé
            'Kem massage', // Làm Đẹp & Sức Khỏe
        ];

        static $index = 0;
        static $catId = 0;


        // Kiểm tra xem có bao nhiêu phần tử trong mảng
        $totalProducts = count($productNames);

        // Kiểm tra nếu $index vượt quá giới hạn của mảng, đặt lại $index về 0
        if ($index >= $totalProducts) {
            $index = 0;
        }

        if ($catId >= 5) {
            $catId = 0;
        }

        // Lấy phần tử từ mảng theo vị trí hiện tại
        $productName = $productNames[$index];

        // Tăng vị trí để lấy phần tử tiếp theo trong lần gọi sau
        $index++;
        $catId++;

        return [
            'product_name' => $productName,
            'cat_id' => $catId,
            'product_image' => null,
            'product_price' => $this->faker->randomFloat(0, 10000, 999999),
            'is_sales' => $this->faker->randomElement([0, 1, 2]),
            'description' => null,
        ];
    }
}
