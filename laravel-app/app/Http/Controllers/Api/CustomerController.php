<?php

namespace App\Http\Controllers\Api;

use App\Entities\Customer;
use App\Http\Controllers\Controller;
use App\Repositories\CustomerRepositoryEloquent;
use Illuminate\Http\Request;
use App\Models\MstCustomer;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{
    public function __construct(public CustomerRepositoryEloquent $customerRepository) 
    {
        $this->customerRepository= $customerRepository;
    }
    public function registerCustomer(Request $request)
    {
        try {
            $validateProduct = Validator::make($request->all(), [
                'name' => 'required|string|min:5|max:255',
                'email' => 'required|email|max:100',
                'tel_num' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10|max:20',
                // 'address' => 'required|max:255',
                'password' => 'required|max:50',
                'repassword' => 'required|max:50',
            ]);

            if ($validateProduct->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateProduct->errors()
                ], 400);
            }

            $customerByEmail = MstCustomer::where('email', $request->email)->first();
            if ($customerByEmail) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email đã tồn tại.',
                ], 401);
            }

            $customerByTelNum = MstCustomer::where('tel_num', $request->tel_num)->first();
            if ($customerByTelNum) {
                return response()->json([
                    'status' => false,
                    'message' => 'Số điện thoại đã tồn tại.',
                ], 401);
            }

            if ( $request->password != $request->repassword) {
                return response()->json([
                    'status' => false,
                    'message' => 'Mật khẩu không giống nhau',
                ], 401);
            }

            return response()->json([
                'status' => true,
                'message' => 'Create User Successfully',
                'data' => $this->customerRepository->postAddCustomer($request),
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function loginCustomer(Request $request)
    {
        try {
            $customer = MstCustomer::where('email', $request->email)->first();

            if (!$customer) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email không chính xác.',
                ], 401);
            }
            if (!Hash::check($request->password, $customer->password)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Mật khẩu không chính xác.',
                ], 401);
            }
            if ($customer && $customer->is_active == 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'Tài khoản của bạn đã bị khóa.',
                ], 401);
            }

            // if(Auth::attempt($request->only(['email', 'password']))){
            //     return response()->json([
            //         'status' => false,
            //         'message' => 'Email hoặc mật khẩu không chính xác.',
            //     ], 401);
            //     // echo'check đang nhạp thanh công';
            // }else{
            //     echo'check đang nhạp that bại';
            // }
            
            $dataLogin = [ 
                // 'last_login_at' => now(),
                // 'last_login_ip' => $request->ip(),
            ];

            $roles = ['customer'];
            $token = $customer->createToken("CUSTOMER_TOKEN", $roles, expiresAt:now()->addHours(3))->plainTextToken;
            if($request->remember_token == true){
                $dataLogin['remember_token'] = $token;
            }
            $login = $customer->update($dataLogin);
            return response()->json([
                'access_token' => $token,
                'token_type' => 'bearer',
                'data_login'=> $login,
                'customer' => [
                    'customer_id' => $customer->id,
                    'name' => $customer->name,
                    'tel_num' => $customer->tel_num,
                    'email' => $customer->email,
                    'address' => $customer->address,
                ],
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function customerList(Request $request)
    {
        try {
            return response()->json([
                'status' => true,
                'message' => 'get customers successfully!',
                'data' => $this->customerRepository->getList($request)
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function customerEdit(Request $request)
    {
        try {
            return response()->json([
                'status' => true,
                'message' => 'put customers successfully!',
                'data' => $this->customerRepository->putCustomer($request)
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }


}