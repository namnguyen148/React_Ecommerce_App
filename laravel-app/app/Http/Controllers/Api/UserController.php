<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\UserRepositoryEloquent;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\MstGroup;
use App\Models\MstUser;

class UserController extends Controller
{   
    public function __construct(public UserRepositoryEloquent $userRepository) 
    {
        $this->userRepository = $userRepository;
    }

    /**
     * List Users
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function listUsers(Request $request)
    {
        try{
            return response()->json([
                'status' => true,
                'message' => 'get list Successfully',
                'data' => $this->userRepository->getList($request)
            ], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }

    }

    /**
     * Add a New User
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function addUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), [
                'name' => 'required|max:255',
                'email' => 'required|email|unique:users,email|max:255',
                'group_role' => 'required|string|max:50',
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ], 400);
            }

            $userWithEmail = User::where('email', $request->email)->first();
            if ($userWithEmail) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email đã tồn tại',
                ], 400);
            }

            $user = $this->userRepository->postAddUser($request);

            return response()->json([
                'status' => true,
                'message' => 'Create User Successfully',
                'data' => $user
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a User
     *
     * @param string $id
     * @return JsonResponse
     */
    public function deleteUser(string $id)
    {   
        if (!is_numeric($id)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid ID format. ID must be a numeric value.'
            ], 400);
        }
        try {
            return response()->json([
                'status' => true,
                'message' => 'Delete User Successfully',
                'data' => $this->userRepository->deleteUser($id)
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Update a User
     *
     * @param string $id
     * @return JsonResponse
     */
    public function updateUser(string $id)
    {   
        if (!is_numeric($id)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid ID format. ID must be a numeric value.'
            ], 400);
        }
        try {
            return response()->json([
                'status' => true,
                'message' => 'Update User Successfully',
                'data' => $this->userRepository->updateUser($id)
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Edit a User
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function editUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), [
                'id' => 'required',
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ], 400);
            }

            return response()->json([
                'message' => 'Edit user Successfully',
                'data' => $this->userRepository->editUser($request)
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
