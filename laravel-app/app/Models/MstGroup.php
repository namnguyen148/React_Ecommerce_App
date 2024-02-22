<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MstGroup extends Model
{
    use HasFactory;

    protected $table = 'mst_group';

    protected $fillable = [
        'group_role',
    ];

    /**
     * Scope để lọc theo vai trò (group_role)
     */
    public function scopeGroupRole($query, $request)
    {
        if ($request->has('group_role') && $request->group_role != '') {
            $query->where('group_role', 'LIKE', '%' . $request->group_role . '%');
        }
        return $query;
    }
}
