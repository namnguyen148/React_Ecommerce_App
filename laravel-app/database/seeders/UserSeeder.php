<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // DB::table('mst_users')->insert([
        //     [
        //         'name' => 'Jane Smith',
        //         'email' => 'jane@example.com',
        //         'password' => Hash::make('pd12345678'),
        //         'is_active' => 1,
        //         'is_delete' => 0,
        //         'group_role' => 'user',
        //     ],
        //     [
        //         'name' => 'Bob Johnson',
        //         'email' => 'bob@example.com',
        //         'password' => Hash::make('pd12345678'),
        //         'is_active' => 1,
        //         'is_delete' => 0,
        //         'group_role' => 'user',
        //     ],
        // ]);
    }
}
