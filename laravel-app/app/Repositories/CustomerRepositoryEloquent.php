<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\CustomerRepository;
use App\Models\MstCustomer;
use App\Validators\CustomerValidator;
use Illuminate\Support\Facades\Hash;

/**
 * Class CustomerRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class CustomerRepositoryEloquent extends BaseRepository implements CustomerRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return MstCustomer::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }


    public function postAddCustomer($request)
    {
        $product = $this;
        if (!empty($request)){
            $data = [
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'tel_num' => $request->tel_num,
                // 'address' => $request->address,
            ];
            return $product->create($data);
        }
        // dd($request);
    }

    public function getList($request)
    {
        $product = $this
        ->join('mst_order', 'mst_order.customer_id', '=', 'mst_customer.id')
        ->sortDesc();
        return $product->paginate(10);
    }

    public function putCustomer($request)
    {
        $customer_id = $request->customer_id;
        $customer = $this->model
            ->where('id', $customer_id)
            ->first();
        if ($customer) {
            $dataUpdate = [
                'name' => $request->name,
                'email' => $request->email,
                'tel_num' => $request->tel_num,
                'address' => $request->address,
            ];
            return $customer->update($dataUpdate);
        }
    }
    
}
