<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MstAddress extends Model
{
    use HasFactory;
    protected $table = 'mst_address';
    protected $fillable = [
        'customer_id',
        'name',
        'tel_num',
        'def_addr',
        'addr_opt',
        'addr_det',
        'district',
        'province',
        'ward',
    ];
}
