<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\OrderRepository;
use App\Models\MstOrder;
use App\Validators\OrderValidator;
use Carbon\Carbon;

/**
 * Class OrderRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class OrderRepositoryEloquent extends BaseRepository implements OrderRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return MstOrder::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function postAddOrder($request)
    {
        // dd($request);
        $order = $this;
        $data = [
            'customer_id' => $request->customer_id,
            'total_price' => $request->total_price,
            'shipping_fee' => $request->shipping_fee,
            'payment_method' => $request->payment_method,
            'status' => $request->status,
            'order_date' => Carbon::now('Asia/Ho_Chi_Minh')->format("Y-m-d H:i:s"),
            'note_customer' => $request->note_customer,
        ];
        return $order->create($data);
    }

    public function getOrderList($request)
    {
        $order = $this
            ->status($request)
            ->price($request)
            ->orderID($request)
            ->calendar($request)
            ->customerID($request)
            ->sortDesc();
        return $order->paginate(5);
    }

    public function getAllOrder($request)
    {
        $result = $this
            // ->join('mst_customer', 'mst_order.customer_id', '=', 'mst_customer.id')
            ->sortDesc();

        return $result->paginate(10);
    }


    public function updateStatus($request)
    {
        $customer_id = $request->customer_id;
        $total_price = $request->total_price;
        $order_date = $request->order_date;

        $order = $this->model
            ->where('customer_id', $customer_id)
            ->where('total_price', $total_price)
            ->where('order_date', $order_date)
            ->first();

        if ($order && $order->status == 1) {
            $dataUpdate = [
                'status' => 0,
                'cancel_date' => Carbon::now('Asia/Ho_Chi_Minh')->format("Y-m-d H:i:s"),
            ];
            return $order->update($dataUpdate);
        }
        return false;
    }

    public function editOrder($request)
    {
        $customer_id = $request->customer_id;
        $total_price = $request->total_price;
        $order_date = $request->order_date;
        $status = $request->status;

        $order = $this->model
            ->where('customer_id', $customer_id)
            ->where('total_price', $total_price)
            ->where('order_date', $order_date)
            ->first();

        if ($order && $status == 0) {
            $dataUpdate = [
                'status' => 0,
                'cancel_date' => Carbon::now('Asia/Ho_Chi_Minh')->format("Y-m-d H:i:s"),
            ];
            return $order->update($dataUpdate);
        }
        $dataStatus = [
            'status' => $status,
        ];
        return $order->update($dataStatus);
    }
}
