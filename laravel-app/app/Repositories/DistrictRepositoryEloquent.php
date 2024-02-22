<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\DistrictRepository;
// use App\Entities\District;
use App\Validators\DistrictValidator;
use App\Models\MstDistrict;

/**
 * Class DistrictRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class DistrictRepositoryEloquent extends BaseRepository implements DistrictRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return MstDistrict::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function getDistrict($request)
    {
        $district = $this;
        if($request->has('province_id') && $request->province_id!= ''){
            return $district->where('province_id',$request->province_id)->get();
        }
        return $district->get();
    }
    
}
