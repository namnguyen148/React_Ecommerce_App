<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MstGroupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $groupRoleOptions = ['admin', 'reviewer', 'editor'];
        return [
            'group_role' => $this->faker->randomElement($groupRoleOptions), 
        ];
    }
}
