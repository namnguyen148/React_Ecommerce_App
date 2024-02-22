<?php

namespace App\Repositories;

use App\Models\MstWard;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\WardRepository;
use App\Validators\WardValidator;

/**
 * Class WardRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class WardRepositoryEloquent extends BaseRepository implements WardRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return MstWard::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function getWard($request)
    {
        // dd($request);
        $ward = $this;
        if($request->has('district_id') && $request->district_id!= ''){
            return $ward->where('district_id',$request->district_id)->get();
        }
        return $ward->get();
    }
    
}
