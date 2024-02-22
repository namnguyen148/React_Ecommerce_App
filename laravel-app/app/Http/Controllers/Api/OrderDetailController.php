<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\OrderDetailRepositoryEloquent;

class OrderDetailController extends Controller
{
    public function __construct(public OrderDetailRepositoryEloquent $orderDetailRepository) 
    {
        $this->orderDetailRepository= $orderDetailRepository;
    }

    public function addOrderDetail(Request $request)
    {
        // dd($request);
        try {
            return response()->json([
                'status' => true,
                'message' => 'Order details added successfully!',
                'data' => $this->orderDetailRepository->postAddOrderDetail($request)
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function getOrderDetail(Request $request)
    {
        // dd($request);
        try{
            return response()->json([
                'status' => true,
                'message' => 'Get list of order successfully!',
                'data' => $this->orderDetailRepository->getOrderList($request)
            ], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    
}
