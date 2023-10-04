<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Store extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'phone_number',
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

    function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }
    function user()
    {
        return $this->belongsTo(User::class);
    }

    function products()
    {
        return $this->hasMany(Product::class);
    }

    function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function reciepts()
    {
        return $this->hasManyThrough(Reciept::class, Order::class);
    }

    function clients()
    {
        return $this->belongsToMany(Client::class, 'store_client', 'store_id', 'client_id');
    }

    public function clients_with_cards()
    {
        $store = $this;

        $clients = $store->clients()->with(['cards' => function ($query) use ($store) {
            $query->where('store_id', $store->id);
        }])->get();

        return $clients;
    }
}
