<?php

namespace App\Repositories;

use App\Models\MstProvince;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\ProvinceRepository;
// use App\Entities\Province;
use App\Validators\ProvinceValidator;

/**
 * Class ProvinceRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class ProvinceRepositoryEloquent extends BaseRepository implements ProvinceRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return MstProvince::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }


    public function getProvince($request)
    {
        // dd($request);
        $province = $this;
        return $province->get();
    }
    
}
