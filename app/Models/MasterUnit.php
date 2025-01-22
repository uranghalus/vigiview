<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterUnit extends Model
{
    //
    protected $table = "master_units";
    protected $fillable = [
        'kode_unit',
        'keterangan',
        'created_by',
        'updated_by'
    ];
    public $timestamps = true;
    /**
     * Relasi ke model Pelapor.
     */
    public function pelapor()
    {
        return $this->hasMany(Pelapor::class, 'tipe_unit_id');
    }
}
