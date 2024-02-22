<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MstOrder extends Model
{
    use HasFactory;
    protected $table = 'mst_order';
    protected $fillable = [
        'customer_id',
        'total_price',
        'payment_method',
        'status',
        'shipping_fee',
        'order_date',
        'cancel_date',
        'note_customer',
    ];


    public function scopeCustomerID($query, $request)
    {
        if ($request->has('customer_id') && $request->customer_id != '') {
            $query->Where('customer_id', 'LIKE', '%' . $request->customer_id . '%');
        }
        return $query;
    }

    public function scopeStatus($query, $request)
    {
        if ($request->has('status')) {
            $query->where('status', 'LIKE', '%' . $request->status . '%');
        }
        return $query;
    }

    public function scopeOrderID($query, $request)
    {
        if ($request->has('order_id')) {
            $query->where('id', 'LIKE', '%' . $request->order_id . '%');
        }
        return $query;
    }

    public function scopePrice($query, $request)
    {
        if ($request->total_price_start != '' && $request->total_price_end != '') {
            $query->whereBetween('total_price', [$request->total_price_start, $request->total_price_end]);
        } elseif ($request->has('total_price_start') && $request->total_price_start != '') {
            $query->where('total_price', '>=', $request->total_price_start);
        } elseif ($request->has('total_price_end') && $request->total_price_end != '') {
            $query->where('total_price', '<=', $request->total_price_end);
        }
        return $query;
    }

    // public function scopeCalender($query, $request)
    // {
    //     if ($request->filled('order_date_start') && $request->filled('order_date_end')) {
    //         $start = \DateTime::createFromFormat('Y-m-d H:i:s', $request->order_date_start);
    //         $end = \DateTime::createFromFormat('Y-m-d H:i:s', $request->order_date_end);
    
    //         if ($start && $end) {
    //             $query->whereBetween('order_date', [$start->format('Y-m-d H:i:s'), $end->format('Y-m-d H:i:s')]);
    //         }
    //     }
    //     return $query;
    // }

    public function scopeCalendar($query, $request)
    {
        if ($request->filled('order_date_start') && $request->filled('order_date_end')) {
            $start = \DateTime::createFromFormat('Y-m-d', $request->order_date_start);
            $end = \DateTime::createFromFormat('Y-m-d', $request->order_date_end);

            if ($start && $end) {
                $end->modify('+1 day')->modify('-1 second');
                $query->whereBetween('order_date', [$start->format('Y-m-d'), $end->format('Y-m-d')]);
            }
        } elseif ($request->filled('order_date_start')) {
            $start = \DateTime::createFromFormat('Y-m-d', $request->order_date_start);

            if ($start) {
                $query->whereDate('order_date', '>=', $start->format('Y-m-d'));
            }
        } elseif ($request->filled('order_date_end')) {
            $end = \DateTime::createFromFormat('Y-m-d', $request->order_date_end);

            if ($end) {
                $query->whereDate('order_date', '<=', $end->format('Y-m-d'));
            }
        }

        return $query;
    }

    

    public function scopeSortDesc($query)
    {
        return $query->orderBy('order_date', 'desc');
    }
}
