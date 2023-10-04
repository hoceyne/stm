<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use  HasFactory, SoftDeletes, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'status'
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


    function client()
    {
        return $this->belongsTo(Client::class);
    }
    function reciept()
    {
        return $this->hasOne(Reciept::class);
    }
    function store()
    {
        return $this->belongsTo(Store::class);
    }

    function products()
    {
        return $this->belongsToMany(Product::class, 'order_product', 'order_id', 'product_id')->withPivot('qte','price');
    }
}
