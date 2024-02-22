<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MstUser;
use App\Models\MstCategory;
use App\Models\MstProduct;
use App\Models\MstCustomer;


class MstUsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        MstUser::factory(30)->create();
        MstCategory::factory(5)->create();
        MstCustomer::factory(20)->create();
        MstProduct::factory(27)->create();
    }
}
