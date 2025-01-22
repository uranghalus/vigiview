<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MasterInstansi extends Model
{
    use HasFactory;

    protected $table = 'master_instansi';

    protected $fillable = [
        'kode_instansi',
        'keterangan_instansi',
        'lokasi',
        'area',
        'unit_id',
    ];

    /**
     * Relasi ke model Pelapor.
     */
    public function pelapor()
    {
        return $this->hasMany(Pelapor::class, 'instansi_id');
    }

    /**
     * Relasi ke model MasterUnit.
     */
    public function unit()
    {
        return $this->belongsTo(MasterUnit::class, 'unit_id');
    }
}
