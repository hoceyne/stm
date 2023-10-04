<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use  HasFactory, SoftDeletes, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'price',
        'description',
        'purchase_date',
        'qte_total',
    ];

    protected $keyType = 'string';
    public $incrementing = false;



    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'id' => 'string',
    ];
    function store()
    {
        return $this->belongsTo(Store::class);
    }

    function orders()
    {
        return $this->belongsToMany(Order::class, 'order_product', 'product_id', 'order_id')->withPivot('qte','price');
    }

    function photos()
    {
        return $this->morphMany(File::class,'fileable');
    }
}
