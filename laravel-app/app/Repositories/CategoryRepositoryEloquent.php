<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\CategoryRepository;
use App\Models\MstCategory;
use App\Validators\CategoryValidator;

/**
 * Class CategoryRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class CategoryRepositoryEloquent extends BaseRepository implements CategoryRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return MstCategory::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    // public function getAllCategories($parentId = 0)
    // {
    //     $categories = $this->where('parent', $parentId)
    //     ->where('status', 1)->orderBy('id', 'asc')->get();

    //     $result = [];

    //     foreach ($categories as $category) {
    //         $subcategories = $this->getAllCategories($category->id);
    //         $categoryData = [
    //             'id' => $category->id,
    //             'name' => $category->name,
    //         ];

    //         if (!empty($subcategories)) {
    //             $categoryData['children'] = $subcategories;
    //         }

    //         $result[] = $categoryData;
    //     }
    //     return $result;
    //     // return $categories;
    // }

    public function getAllCategories()
    {
        $categories = $this->where('status', 1)->orderBy('id', 'asc')->get();
        $categoryTree = $this->buildCategoryTree($categories);
        return $categoryTree;
    }

    protected function buildCategoryTree($categories, $parentId = 0)
    {
        $categoryTree = [];
        foreach ($categories as $category) {
            if ($category->parent == $parentId) {
                $subcategories = $this->buildCategoryTree($categories, $category->id);

                $categoryData = [
                    'id' => $category->id,
                    'name' => $category->name,
                ];

                if (!empty($subcategories)) {
                    $categoryData['children'] = $subcategories;
                }

                $categoryTree[] = $categoryData;
            }
        }

        return $categoryTree;
    }

    public function addCategory($request)
    {
        $category = $this;
        $data = [
            'name' => $request->name,
            'parent' => $request->parent,
        ];
        return $category->create($data);
    }
}
