<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\OrderRepositoryEloquent;
use App\Models\MstOrder;

class OrderController extends Controller
{
    public function __construct(public OrderRepositoryEloquent $orderRepository) 
    {
        $this->orderRepository= $orderRepository;
    }

    public function addOrder(Request $request)
    {
        // dd($request);
        try {
            return response()->json([
                'status' => true,
                'message' => 'Order added successfully!',
                'data' => $this->orderRepository->postAddOrder($request)
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function getOrder(Request $request)
    {
        // dd($request);
        try {
            return response()->json([
                'status' => true,
                'message' => 'get Order successfully!',
                'data' => $this->orderRepository->getOrderList($request)
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function getAllOrder(Request $request)
    {
        // dd($request);
        try {
            return response()->json([
                'status' => true,
                'message' => 'get Order successfully!',
                'data' => $this->orderRepository->getAllOrder($request)
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function updateOrder(Request $request)
    {
        // dd($request);
        try {
            return response()->json([
                'status' => true,
                'message' => 'Update Order successfully!',
                'data' => $this->orderRepository->updateStatus($request)
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function editOrder(Request $request)
    {
        // dd($request);
        try {
            return response()->json([
                'status' => true,
                'message' => 'Edit Order successfully!',
                'data' => $this->orderRepository->editOrder($request)
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
