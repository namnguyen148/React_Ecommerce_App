<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MstProduct extends Model
{
    use HasFactory;
    protected $table = 'mst_product';
    protected $fillable = [
        'product_name',
        'product_image',
        'cat_id',
        'product_price',
        'is_sales',
        'description',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            // Chuyển đổi chữ đầu tiên thành chữ hoa
            $firstLetter = ucfirst(substr($product->product_name, 0, 1));
            if (!preg_match('/^[A-Z]$/', $firstLetter)) {
                $firstLetter = 'D';
            }
            
            // Tìm sản phẩm mới nhất với chữ đầu tiên giống nhau
            $latestProduct = MstProduct::where('product_id', 'like', $firstLetter . '%')
                ->orderBy('product_id', 'desc')
                ->first();
            
            if ($latestProduct) {
                // Tăng số thứ tự và thêm số 0 ở đầu (nếu cần)
                $sequenceNumber = str_pad((int)substr($latestProduct->product_id, 1) + 1, 9, '0', STR_PAD_LEFT);
            } else {
                // Nếu không có sản phẩm trước với chữ đầu tiên giống nhau, bắt đầu từ 1
                $sequenceNumber = str_pad(1, 9, '0', STR_PAD_LEFT);
            }
            
            // Tạo product_id bằng cách kết hợp chữ đầu tiên và số thứ tự
            $product->product_id = $firstLetter . $sequenceNumber;
        });
    }

    /**
     * Scope để lọc sản phẩm theo tên
     */
    public function scopeName($query, $request)
    {
        if ($request->has('product_name') && $request->product_name != '') {
            $query->Where('product_name', 'LIKE', '%' . $request->product_name . '%');
        }
        return $query;
    }

    /**
     * Scope để lọc sản phẩm theo tình trạng (is_sales)
     */
    public function scopeSales($query, $request)
    {
        if ($request->has('is_sales') && $request->is_sales != '') {
            $query->where('is_sales', 'LIKE', '%' . $request->is_sales . '%');
        }
        return $query;
    }

    /**
     * Scope để lọc sản phẩm theo giá
     */
    public function scopePrice($query, $request)
    {
        if ($request->start_price != '' && $request->last_price != '') {
            $query->whereBetween('product_price', [$request->start_price, $request->last_price]);
        } elseif ($request->has('start_price') && $request->start_price != '') {
            $query->where('product_price', '>=', $request->start_price);
        } elseif ($request->has('last_price') && $request->last_price != '') {
            $query->where('product_price', '<=', $request->last_price);
        }
        return $query;
    }

    /**
     * Scope để sắp xếp sản phẩm theo thứ tự giảm dần
     */
    public function scopeSortDesc($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    /**
     * Scope to filter products where is_sales is not equal to 0
     */
    public function scopeCheckProducts($query)
    {
        return $query->where('is_sales', '!=', 0);
    }
}
