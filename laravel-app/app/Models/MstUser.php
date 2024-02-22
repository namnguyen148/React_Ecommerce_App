<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class MstUser extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'mst_users';

    protected $fillable = [
        'name',
        'email',
        'password',
        'remember_token',
        'is_active',
        'is_delete',
        'group_role',
        'last_login_at',
        'last_login_ip',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
