<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Repositories\UserRepositoryEloquent;

class AuthController extends Controller
{
    function __construct(public UserRepositoryEloquent $userRepository) 
    {
        $this->userRepository = $userRepository;
    }
    /**
     * Login The User
     * @param Request $request
     * @return User
     */

    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), 
            [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = User::where('email', $request->email)->first();
            if ($user && $user->is_active == 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'Tài khoản của bạn đã bị khóa.',
                ], 401);
            }

            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email hoặc mật khẩu không chính xác.',
                ], 401);
            }
            
            $dataLogin = [ 
                'last_login_at' => now(),
                'last_login_ip' => $request->ip(),
            ];

            if ($user->group_role == 'admin'){
                $roles = ['admin','editor','reviewer'];
                $token = $user->createToken("API TOKEN", $roles, expiresAt:now()->addHours(3))->plainTextToken;
                if($request->remember_token == true){
                    $dataLogin['remember_token'] = $token;
                }
                $login = $user->update($dataLogin);
                return response()->json([
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'data_login'=> $login,
                    'user' => $user->group_role,
                    'email' => $user->email,
                ], 200);
            }
            else if ($user->group_role == 'editor'){
                $roles = ['editor','reviewer'];
                $token = $user->createToken("API TOKEN", $roles, expiresAt:now()->addHours(3))->plainTextToken;
                if($request->remember_token == true){
                    $dataLogin['remember_token'] = $token;
                }
                $login = $user->update($dataLogin); 
                return response()->json([
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'data_login'=> $login,
                    'user' => $user->group_role,
                    'email' => $user->email,
                ], 200);
            }
            else if ($user->group_role == 'reviewer'){
                $token = $user->createToken("API TOKEN", ['reviewer'], expiresAt:now()->addHours(3))->plainTextToken;
                if($request->remember_token == true){
                    $dataLogin['remember_token'] = $token;
                }
                $login = $user->update($dataLogin); 
                return response()->json([
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'data_login'=> $login,
                    'user' => $user->group_role,
                    'email' => $user->email,
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
