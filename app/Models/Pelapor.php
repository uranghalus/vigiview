<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
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
        'tipe_unit_id',
        'instansi_id',
        'departemen_id',
        'jabatan_id',
        'catatan',
        'foto',
        'create_date',
        'create_user',
        'modified_date',
        'modified_user',
    ];

    public $timestamps = true;

    /**
     * Relasi ke model MasterUnit.
     */
    public function tipeUnit()
    {
        return $this->belongsTo(MasterUnit::class, 'tipe_unit_id');
    }

    /**
     * Relasi ke model MasterInstansi.
     */
    public function instansi()
    {
        return $this->belongsTo(MasterInstansi::class, 'instansi_id');
    }

    /**
     * Relasi ke model Departemen.
     */
    public function departemen()
    {
        return $this->belongsTo(Department::class, 'departemen_id');
    }

    /**
     * Relasi ke model Jabatan.
     */
    public function jabatan()
    {
        return $this->belongsTo(Jabatan::class, 'jabatan_id');
    }

    protected function foto(): Attribute
    {
        return Attribute::make(get: fn($value) => url('storage/uploads/pelapor/' . $value));
    }
}
