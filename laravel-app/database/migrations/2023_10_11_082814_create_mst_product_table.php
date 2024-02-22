<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mst_product', function (Blueprint $table) {
            $table->string('product_id', 20)->primary();
            $table->string('product_name',255);
            $table->bigInteger('cat_id')->unsigned();
            $table->foreign('cat_id')->references('id')->on('mst_categories');
            $table->string('product_image',255)->nullable();
            $table->decimal('product_price',8,0)->default(0);
            $table->tinyInteger('is_sales')->default(1);
            $table->text('description')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_product');
    }
};
