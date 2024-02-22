<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Requests\StorePostRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderDetailController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AddressController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/auth/login', [AuthController::class, 'loginUser']);
Route::middleware( 'throttle:500,1')->group(function (){
  Route::prefix('users')->group(function(){
    Route::get('/list', [UserController::class, 'listUsers'])->middleware(['auth:sanctum','abilities:admin']);
    Route::post('/add', [UserController::class, 'addUser'])->middleware(['auth:sanctum','abilities:admin']);
    Route::put('/edit', [UserController::class, 'editUser'])->middleware(['auth:sanctum','abilities:admin']);
    Route::patch('/update/{id}', [UserController::class, 'updateUser'])->middleware(['auth:sanctum','abilities:admin']);
    Route::delete('/delete/{id}', [UserController::class, 'deleteUser'])->middleware(['auth:sanctum','abilities:admin']);
  });
  Route::prefix('products')->group(function(){
    Route::get('/list_products', [ProductController::class, 'getProducts']);
    Route::get('/product_details/{id}', [ProductController::class, 'getProductDetails']);
    Route::get('/list', [ProductController::class, 'listProducts'])->middleware(['auth:sanctum','abilities:reviewer']);
    Route::post('/add', [ProductController::class, 'addProducts'])->middleware(['auth:sanctum','abilities:editor']);
    Route::put('/edit/{id}', [ProductController::class, 'update'])->middleware(['auth:sanctum','abilities:editor']);
    Route::delete('/delete/{id}', [ProductController::class, 'destroy'])->middleware(['auth:sanctum','abilities:editor']);
  });
  Route::prefix('customers')->group(function(){
    Route::post('/login', [CustomerController::class, 'loginCustomer']);
    Route::post('/register', [CustomerController::class, 'registerCustomer']);
    Route::get('/list', [CustomerController::class, 'customerList']);
    Route::put('/edit', [CustomerController::class, 'customerEdit']);

  });
  Route::prefix('orders')->group(function(){
    Route::get('/list', [OrderController::class, 'getOrder']);
    Route::get('/order', [OrderController::class, 'getAllOrder']);
    Route::post('/add', [OrderController::class, 'addOrder']);
    Route::put('/edit', [OrderController::class, 'editOrder']);
    Route::patch('/update', [OrderController::class, 'updateOrder']);
  });
  Route::prefix('order_details')->group(function(){
    Route::post('/add', [OrderDetailController::class, 'addOrderDetail']);
    Route::get('/list', [OrderDetailController::class, 'getOrderDetail']);
  });
  Route::prefix('categories')->group(function(){
    Route::get('/list', [CategoryController::class, 'getCategory']);
    Route::post('/add', [CategoryController::class, 'postCategory']);
  });

  Route::prefix('address')->group(function(){
    Route::get('/provinces', [AddressController::class, 'getProvince']);
    Route::get('/districts', [AddressController::class, 'getDistrict']);
    Route::get('/wards', [AddressController::class, 'getWard']);
    Route::get('/list', [AddressController::class, 'getAddress']);
    Route::get('/check', [AddressController::class, 'getCheckAddress']);
    Route::post('/add', [AddressController::class, 'postAddress']);
    Route::patch('/update', [AddressController::class, 'patchUpdate']);
    Route::delete('/delete/{id}', [AddressController::class, 'deleteAddress']);
  });

});
