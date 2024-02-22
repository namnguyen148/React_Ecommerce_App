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
        Schema::create('mst_order', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('customer_id');
            $table->foreign('customer_id')->references('id')->on('mst_customer');
            $table->integer('total_price');
            $table->integer('shipping_fee')->default(0);
            $table->tinyInteger('payment_method');
            $table->tinyInteger('status');
            $table->dateTime('order_date');
            $table->dateTime('cancel_date')->nullable();
            $table->string('note_customer', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_order');
    }
};
