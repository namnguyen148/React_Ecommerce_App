<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\OrderDetailRepository;
use App\Models\MstOrderDetail;
use App\Models\MstOrder;
use App\Models\MstCustomer;
use App\Models\MstProduct;
use App\Validators\OrderDetailValidator;

/**
 * Class OrderDetailRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class OrderDetailRepositoryEloquent extends BaseRepository implements OrderDetailRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return MstOrderDetail::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function postAddOrderDetail($request)
    {
        $orderDetail = $this;
        $data = [
            'customer_id' => $request->customer_id,
            'order_id' => $request->order_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'price_buy' => $request->product_price,
        ];
        if (!empty($request)){
            return $orderDetail->create($data);
        }
    }

    public function getOrderList($request)
    {
        $order = $this->model
            ->where('customer_id', $request->customer_id)
            ->where('order_id', $request->order_id)
            ->join('mst_product', 'mst_order_detail.product_id', '=', 'mst_product.product_id');
        return $order->paginate(30);
        // dd($request);
    }
}
