<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\UserRepository;
use App\Models\User;
use App\Validators\UserValidator;

/**
 * Class UserRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class UserRepositoryEloquent extends BaseRepository implements UserRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return User::class;
    }
    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
    
    /**
     * Get a list of users based on filters and sorting
     *
     * @param mixed $request
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getList($request)
    {     
        $user = $this
            ->name($request)
            ->email($request)
            ->role($request)
            ->status($request)
            ->isNotDeleted()
            ->sortDesc();
        if ($request->has('per_page') && $request->per_page != ''){
            return $user->paginate($request->per_page);
        }else {
            return $user->paginate(10);
        }
    }

    /**
     * Add a new user
     *
     * @param mixed $request
     * @return \App\Models\User
     */
    public function postAddUser($request)
    {
        $user = $this->createUser($request);
        return $user;
    }
    
    /**
     * Delete a user
     *
     * @param string $id
     * @return bool
     */
    public function deleteUser($id)
    {     
        if (!empty($id)) {
            $user = $this->model->find($id);

            if ($user->is_delete == 0) {
                $dataDelete = [ 
                    'is_delete' => 1, 
                ];
                return $user->update($dataDelete); 
            }
            return null;
        }
    }

    /**
     * Update a user's status (active or inactive)
     *
     * @param string $id
     * @return bool
     */
    public function updateUser($id)
    {     
        if (!empty($id)) {
            $user = $this->model->find($id);

            if ($user->is_active == 1) {
                $dataUpdate = [ 
                    'is_active' => 0, 
                ];
                return $user->update($dataUpdate); 
            } else {
                $dataUpdate  = [ 
                    'is_active' => 1, 
                ];
                return $user->update($dataUpdate); 
            }
        }
    }

    /**
     * Edit a user's details
     *
     * @param mixed $request
     * @return bool
     */
    public function editUser($request)
    {   
        if (!empty($request->id)){
            $dataUpdate = [ 
                'name' => $request->name, 
                'email' => $request->email, 
                'group_role' => $request->group_role, 
                'is_active' => $request->is_active, 
            ];
            if(!empty($request->password)){
                $dataUpdate['password'] = bcrypt($request->password);
            }
            return $this->where('id', $request->id)->update($dataUpdate); 
        } 
    }
}
