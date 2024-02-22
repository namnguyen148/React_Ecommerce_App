<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\CategoryRepositoryEloquent;

class CategoryController extends Controller
{
    public function __construct(public CategoryRepositoryEloquent $categoryRepository)
    {
        $this->categoryRepository= $categoryRepository;
    }

    public function getCategory(Request $request)
    {
        try{
            return response()->json([
                'status' => true,
                'message' => 'Get categories successfully!',
                'data' => $this->categoryRepository-> getAllCategories($request)
            ], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function postCategory(Request $request)
    {
        try{
            return response()->json([
                'status' => true,
                'message' => 'Get categories successfully!',
                'data' => $this->categoryRepository->addCategory($request)
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
