<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\ProvinceRepositoryEloquent;
use App\Repositories\DistrictRepositoryEloquent;
use App\Repositories\WardRepositoryEloquent;
use App\Repositories\AddressRepositoryEloquent;

class AddressController extends Controller
{
    protected $provinceRepository;
    protected $districtRepository;
    protected $wardRepository;
    protected $addressRepository;

    public function __construct(
        ProvinceRepositoryEloquent $provinceRepository,
        DistrictRepositoryEloquent $districtRepository,
        WardRepositoryEloquent $wardRepository,
        AddressRepositoryEloquent $addressRepository,
    ) {
        $this->provinceRepository = $provinceRepository;
        $this->districtRepository = $districtRepository;
        $this->wardRepository = $wardRepository;
        $this->addressRepository = $addressRepository;
    }

    public function getProvince(Request $request)
    {
        try{
            return response()->json([
                'status' => true,
                'message' => 'Get province successfully!',
                'data' => $this->provinceRepository->getProvince($request)
            ], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function getDistrict(Request $request)
    {
        try{
            return response()->json([
                'status' => true,
                'message' => 'Get district successfully!',
                'data' => $this->districtRepository->getDistrict($request)
            ], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function getWard(Request $request)
    {
        try{
            return response()->json([
                'status' => true,
                'message' => 'Get wards successfully!',
                'data' => $this->wardRepository->getWard($request)
            ], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function postAddress(Request $request)
    {
        try{
            return response()->json([
                'status' => true,
                'message' => 'Post address successfully!',
                'data' => $this->addressRepository->postAddress($request)
            ], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function getAddress(Request $request)
    {
        try{
            return response()->json([
                'status' => true,
                'message' => 'Get address successfully!',
                'data' => $this->addressRepository->getAddress($request)
            ], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function getCheckAddress(Request $request)
    {
        try{
            return response()->json([
                'status' => true,
                'message' => 'Get check address successfully!',
                'data' => $this->addressRepository->getCheckAddress($request)
            ], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function patchUpdate(Request $request)
    {
        try{
            return response()->json([
                'status' => true,
                'message' => 'Get default address successfully!',
                'data' => $this->addressRepository->updateDefAddr($request)
            ], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function deleteAddress($id)
    {
        try{
            return response()->json([
                'status' => true,
                'message' => 'Delete address successfully!',
                'data' => $this->addressRepository->deleteAddress($id)
            ], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

}
