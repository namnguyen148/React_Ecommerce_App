<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\AddressRepository;
use App\Validators\AddressValidator;
use App\Models\MstAddress;

/**
 * Class AddressRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class AddressRepositoryEloquent extends BaseRepository implements AddressRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return MstAddress::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    // public function postAddress($request)
    // {
    //     // dd($request);
    //     $address = $this;
    //     $exist = $address->where('customer_id', $request->customer_id)->first();
    //     $data = [
    //         'customer_id' => $request->customer_id,
    //         'name' => $request->name,
    //         'tel_num' => $request->tel_num,
    //         'def_addr' => $request->def_addr,
    //         'addr_opt' => $request->addr_opt,
    //         'addr_det' => $request->addr_det,
    //         'district' => $request->district,
    //         'province' => $request->province,
    //         'ward' => $request->ward,
    //     ];
    //     if ($request->has('def_addr') && $request->def_addr == 1) {
    //         $address->where('customer_id', $request->customer_id)->update(['def_addr' => 0]);
    //     }
    //     if (!$exist){
    //         return $address->create($data)->update(['def_addr' => 1]);
    //     }
    //     return $address->create($data);
    // }
    
    public function postAddress($request)
    {
        $address = $this;
        $exist = $address->where('customer_id', $request->customer_id)->first();
        $data = [
            'customer_id' => $request->customer_id,
            'name' => $request->name,
            'tel_num' => $request->tel_num,
            'def_addr' => $request->def_addr,
            'addr_opt' => $request->addr_opt,
            'addr_det' => $request->addr_det,
            'district' => $request->district,
            'province' => $request->province,
            'ward' => $request->ward,
        ];

        if ($exist && $request->has('def_addr') && $request->def_addr == 1) {
            $address->where('customer_id', $request->customer_id)->update(['def_addr' => 0]);
        }

        if (!$exist) {
            $createdAddress = $address->create($data);
            $createdAddress->update(['def_addr' => 1]);
            return $createdAddress;
        }

        return $address->create($data);
    }


    public function getAddress($request)
    {
        $query = $this->where('customer_id', $request->customer_id)->orderByDesc('def_addr');
        return $query->paginate(10);
    }

    public function getCheckAddress($request)
    {
        $count = $this->where('customer_id', $request->customer_id)->count();
        return $count > 0;
    }


    public function updateDefAddr($request)
    {
        $this->where('customer_id', $request->customer_id)
            ->update(['def_addr' => 0]);

        return $this->where('customer_id', $request->customer_id)
            // ->where('province', $request->province)
            // ->where('district', $request->district)
            // ->where('ward', $request->ward)
            ->where('id', $request->addressID)
            ->update(['def_addr' => 1]);
    }

    public function deleteAddress($id)
    {
        $address = $this;
        return $address->where('id', $id)->delete(); 
    }
}
