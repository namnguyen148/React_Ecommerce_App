<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\ProductRepositoryEloquent;
use Illuminate\Http\Request;
use App\Models\MstProduct;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\ProductStoreRequest;

class ProductController extends Controller
{
    public function __construct(public ProductRepositoryEloquent $productRepository) 
    {
        $this->productRepository = $productRepository;
    }
    /**
     * List Products
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function listProducts(Request $request)
    {
        try{
            $validateUser = Validator::make($request->all(), [
                'start_price' => 'nullable|numeric',
                'last_price' => 'nullable|numeric',
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ], 400);
            }
            
            return response()->json([
                'status' => true,
                'message' => 'Get product listing successfully!',
                'data' => $this->productRepository->getProductList($request)
            ], 200);
            
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function getProducts(Request $request)
    {
        try{
            return response()->json([
                'status' => true,
                'message' => 'Get list of product successfully!',
                'data' => $this->productRepository->getProducts($request)
            ], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function getProductDetails($id)
    {
        try{
            return response()->json([
                'status' => true,
                'message' => 'Get product details successfully!',
                'data' => $this->productRepository->getProductDetails($id)
            ], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
        // dd($id);
    }

    /**
     * Add a New Product
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function addProducts(Request $request)
    {
        try {
            $validateProduct = Validator::make($request->all(), [
                'product_name' => 'required|string|max:255',
                'product_price' => 'required|numeric',
                'is_sales' => 'required|in:0,1,2',
                'product_image' => 'nullable|image|mimes:jpeg,png,jpg|dimensions:max_width=1024,max_height=1024|max:2048',
                'description' => 'nullable|string',
            ]);

            if ($validateProduct->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateProduct->errors()
                ], 400);
            }
            return response()->json([
                'status' => true,
                'message' => 'Product added successfully!',
                'data' => $this->productRepository->postAddProduct($request)
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Update a Product
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {  
        $requestData = $request->all();

        if ($requestData['product_image'] instanceof \Illuminate\Http\UploadedFile) {
            $validateProduct = Validator::make($requestData, [
                'product_name' => 'required|string|max:255',
                'product_price' => 'required|numeric',
                'is_sales' => 'required|in:0,1,2',
                'product_image' => 'nullable|image|mimes:jpeg,png,jpg|dimensions:max_width=1024,max_height=1024|max:2048',
                'description' => 'nullable|string',
            ]);
        } else {
            $validateProduct = Validator::make($requestData, [
                'product_name' => 'required|string|max:255',
                'product_price' => 'required|numeric',
                'is_sales' => 'required|in:0,1,2',
                'product_image' => 'nullable|string',
                'description' => 'nullable|string',
            ]);
        }

        if ($validateProduct->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateProduct->errors()
            ], 400);
        }
        return response()->json([
            'status' => true,
            'message' => 'Product updated successfully!',
            'data' => $this->productRepository->putProduct($request, $id),
        ], 200);
    }

    /**
     * Delete a Product
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id)
    {  
        return response()->json([
            'status' => true,
            'message' => 'Product deleted successfully!',
            'data' => $this->productRepository->deleteProduct($id),
        ], 200);       
    }
}
