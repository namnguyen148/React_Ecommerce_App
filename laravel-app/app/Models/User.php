<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'mst_users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    
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

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Scope to filter by user's name
     */
    public function scopeName($query, $request)
    {
        if ($request->has('name') && $request->name != '') {
            $query->Where('name', 'LIKE', '%' . $request->name . '%');
        }
        return $query;
    }

    /**
     * Scope to filter by user's email
     */
    public function scopeEmail($query, $request)
    {
        if ($request->has('email') && $request->email != '') {
            $query->where('email', 'LIKE', '%' . $request->email . '%');
        }
        return $query;
    }

    /**
     * Scope to filter by user's role
     */
    public function scopeRole($query, $request)
    {
        if ($request->has('group_role') && $request->group_role != '') {
            $query->where('group_role', 'LIKE', '%' . $request->group_role . '%');
        }
        return $query;
    }

    /**
     * Scope to filter by user's status (active or inactive)
     */
    public function scopeStatus($query, $request)
    {
        if ($request->has('is_active') && $request->is_active != '') {
            $query->where('is_active', 'LIKE', '%' . $request->is_active . '%');
        }
        return $query;
    }

    /**
     * Scope to sort users in descending order of creation
     */
    public function scopeSortDesc($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    /**
     * Scope to filter users that are not deleted
     */
    public function scopeIsNotDeleted($query)
    {
        return $query->where('is_delete', 0);
    }

    /**
     * Scope to create a new user
     */
    public function scopeCreateUser($query, $request)
    {
        $userData = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'is_active' => $request->input('is_active', 1),
            'is_delete' => $request->input('is_delete', 0),
            'group_role' => $request->input('group_role'),
        ];

        return $query->create($userData);
    }

    /**
     * Scope to remove a user
     */
    public function scopeRemoveUser($query, $request){
        if ($request->has('email') && $request->email != '') {
            $query->where('email', 'LIKE', '%' . $request->email . '%');
        }
        return $query->delete($request);
    }

    /**
     * Scope to update a user's details
     */
    public function scopePutUser($query, $request){ 
        if ($request->has('id') && $request->id != ''){ 
            $query->where('id', $request->id)
            ->update([ 
                'name' => $request->name, 
                'email' => $request->email, 
                'password' => $request->password, 
                'group_role' => $request->group_role, 
                'is_active' => $request->is_active, 
            ]); 
        } return $query; 
    }

}
