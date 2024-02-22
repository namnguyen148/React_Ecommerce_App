<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MstOrderDetail extends Model
{
    use HasFactory;
    protected $table = 'mst_order_detail';
    protected $fillable = [
        'customer_id',
        'product_id',
        'order_id',
        'quantity',
        'price_buy',
    ];
}
