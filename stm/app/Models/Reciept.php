<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reciept extends Model
{
    use  HasFactory, SoftDeletes,HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'total',
    ];

    protected $keyType = 'string';
    public $incrementing = false;


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'id'=>'string',
    ];


    function order()
    {
        return $this->belongsTo(Order::class);
    }
}
