<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class MstCustomer extends Model
{
    use HasFactory,HasApiTokens;

    protected $table = 'mst_customer';

    protected $fillable = [
        'name',
        'email',
        'password',
        'remember_token',
        'tel_num',
        'is_active',
        'last_login_at',
        'last_login_ip',
    ];

    public function scopeSortDesc($query)
    {
        return $query->orderBy('order_date', 'desc');
    }
}
