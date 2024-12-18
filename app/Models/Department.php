<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    //
    use HasFactory;

    // Tentukan kolom yang bisa diisi
    protected $fillable = [
        'kode',
        'keterangan',
        'created_date',
        'created_by',
        'modified_date',
        'modified_by',
    ];

    // Tentukan format timestamp jika diperlukan
    protected $dates = [
        'created_date',
        'modified_date',
    ];
}
