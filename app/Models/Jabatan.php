<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jabatan extends Model
{
    //
    use HasFactory;
    protected $table = 'jabatan';
    protected $fillable = [
        'kode',
        'keterangan',
        'create_date',
        'create',
        'modified_date',
        'modified',
    ];

    public $timestamps = true;
}
