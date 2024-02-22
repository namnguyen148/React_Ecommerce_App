<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MstUserFactory extends Factory
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
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('pd123456'), 
            'remember_token' => null,
            'verify_email' => null, 
            'is_active' => 1, 
            'is_delete' => 0, 
            'group_role' => $this->faker->randomElement($groupRoleOptions), 
            'last_login_at' => null, 
            'last_login_ip' => null,
        ];
    }
}
