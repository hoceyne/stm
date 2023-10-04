<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
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

    function user()
    {
        return $this->belongsTo(User::class);
    }

    function orders()
    {
        return $this->hasMany(Order::class);
    }
    public function reciepts()
    {
        return $this->hasManyThrough(Reciept::class, Order::class);
    }
    function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }
    function stores()
    {
        return $this->belongsToMany(Store::class, 'store_client', 'client_id', 'store_id');
    }

    public function cards()
    {
        return $this->hasMany(Card::class);
    }
    public function rewards()
    {
        return $this->hasManyThrough(Reward::class, Card::class);
    }
}
