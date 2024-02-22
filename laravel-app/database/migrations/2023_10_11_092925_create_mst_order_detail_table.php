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
        Schema::create('mst_order_detail', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('customer_id');
            $table->foreign('customer_id')->references('id')->on('mst_customer');
            $table->string('product_id', 20);
            $table->foreign('product_id')->references('product_id')->on('mst_product');
            $table->unsignedBigInteger('order_id');
            $table->foreign('order_id')->references('id')->on('mst_order');
            $table->integer('quantity');
            $table->integer('price_buy');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_order_detail');
    }
};
