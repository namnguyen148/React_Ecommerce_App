<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\ProductRepository;
use App\Models\MstProduct;
use App\Validators\ProductValidator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

/**
 * Class ProductRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class ProductRepositoryEloquent extends BaseRepository implements ProductRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return MstProduct::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    /**
     * Get a List of Products based on Filters and Sorting
     *
     * @param Request $request
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getProductList($request)
    {
        $product = $this
        ->name($request)
        ->sales($request)
        ->price($request)
        ->sortDesc()
        ->CheckProducts();
        if ($request->has('per_page') && $request->per_page != ''){
            return $product->paginate($request->per_page);
        }else {
            return $product->paginate(10);
        }
    }

    public function getProducts($request)
    {
        $product = $this
            ->name($request)
            ->sales($request)
            ->price($request)
            ->sortDesc()
            ->CheckProducts();

        if ($request->has('cat_id') && $request->cat_id != '') {
            return $product = $this->model
                ->where('mst_product.cat_id', $request->cat_id) // Filter products based on cat_id
                ->join('mst_categories', 'mst_product.cat_id', '=', 'mst_categories.id')
                // ->select('mst_categories.name')
                ->orderBy('mst_product.created_at', 'desc')
                ->where('is_sales', '!=', 0)
                ->paginate(12);
        } else {
            return $product->paginate(12);
        }
    }


    /**
     * Get product details by product_id
     *
     * @param int $id The product_id to retrieve details for
     * @return array|null An array containing product details if the product is found, or null if not found
     */
    public function getProductDetails($id)
    {
        $product = $this->where('product_id', $id)->first();
        if ($product) {
            return [
                'product_id'      => $id,
                'product_name'    => $product->product_name,
                'product_image'   => $product->product_image,
                'product_price'   => $product->product_price,
                'is_sales'        => $product->is_sales,
                'description'     => $product->description,
            ];
        } else {
            return null;
        }
    }

    /**
     * Add a new product
     *
     * @param mixed $request
     * @return \App\Models\MstProduct
     */
    public function postAddProduct($request)
    {
        $product = $this;
        $data = [
            'product_id' => Str::random(10),
            'product_name' => $request->product_name,
            'product_price' => $request->product_price,
            'is_sales' => $request->is_sales,
        ];
        if (!empty($request->product_image) && $request->has('product_image')){
            $productName = str_replace(' ', '-', $request->product_name) . '-' . time();
            $imageName = $productName.'.'.$request->product_image->extension();
            Storage::disk('public')->put('products/'.$imageName, file_get_contents($request->product_image));
            $data['product_image'] = $imageName;
        }
        if (!empty($request->description) && $request->has('description')){
            $data['description'] = $request->description;
        }
        return $product->create($data);
    }

    /**
     * Update a product
     *
     * @param mixed $request
     * @param string $id
     * @return bool
     */
    public function putProduct($request, $id)
    {
        $product = $this;
        $data = [
            'product_name' => $request->product_name,
            'product_price' => $request->product_price,
            'is_sales' => $request->is_sales,
        ];

        if ($request->has('description') && $request->description != ''){
            $data['description'] = $request->description;
        }

        if (!empty($request->product_image) && $request->hasFile('product_image')) {
            $uploadedFile = $request->file('product_image');
            $productName = str_replace(' ', '-', $request->product_name);
            $getName = $product->where('product_id', $id)->value('product_image');
            $storage = Storage::disk('public');
            $filePath = 'products/' . $getName;
            $extension = $uploadedFile->getClientOriginalExtension();
            $imageName = $productName . '-' . time() . '.' . $extension;
            
            $storage->put('products/' . $imageName, file_get_contents($uploadedFile));
            $storage->delete(public_path('products/' . $getName));
        
            if ($storage->exists($filePath)) {
                $storage->delete($filePath);
            }
            $data['product_image'] = $imageName;
        }

        if($request->product_image == null && empty($request->product_image)) {
            $getImage = $product->where('product_id', $id)->value('product_image');
            $storage = Storage::disk('public');
            $filePath = 'products/' . $getImage;
            if ($storage->exists($filePath)) {
                $storage->delete($filePath);
            }
            $data['product_image'] = null;
        }  
        return $product->where('product_id', $id)->update($data);
    }

    /**
     * Delete a product
     *
     * @param string $id
     * @return bool
     */
    public function deleteProduct($id)
    {
        $product = $this;
        $getImage = $product->where('product_id', $id)->value('product_image');
        $storage = Storage::disk('public');
        $filePath = 'products/' . $getImage;

        if ($storage->exists($filePath)) {
            $storage->delete($filePath);
        }
        return $product->where('product_id', $id)->delete(); 
    }
}
