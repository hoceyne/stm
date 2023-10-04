<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Card extends Model
{
    use HasFactory, SoftDeletes,HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'score',
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
    public function store() {
        return $this->belongsTo(Store::class);
    }
    public function client() {
        return $this->belongsTo(Client::class);
    }
    public function rewards()
    {
        return $this->hasMany(Reward::class);
    }
    
}
