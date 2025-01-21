<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelapor extends Model
{
    //
    use HasFactory;

    protected $table = 'pelapors';

    protected $fillable = [
        'nama_lengkap',
        'jenis_kelamin',
        'no_telp',
        'jenis_pengenal',
        'no_id_pengenal',
        'tipe_unit',
        'nama_instansi',
        'lokasi',
        'area',
        'departemen',
        'jabatan',
        'catatan',
        'foto',
        'create_date',
        'create_user',
        'modified_date',
        'modified_user',
    ];

    public $timestamps = true;
}
