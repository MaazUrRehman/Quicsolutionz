<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class products extends Model
{
    /** @use HasFactory<\Database\Factories\ProductsFactory> */
    use HasFactory, Notifiable;
    protected $table = 'products';
    protected $fillable = [
        'product_name',
        'manufacturer_name',
        'category',
        'product_price',
        'model_number',
        'part_number',
        'availability',
        'condition',
        'description',
        'image',
    ];
}
