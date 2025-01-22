<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $units = [
            ['kode_unit' => 'DUTA', 'keterangan' => 'Duta Mall', 'created_by' => 'system'],
            ['kode_unit' => 'OUT', 'keterangan' => 'Outsourcing', 'created_by' => 'system'],
            ['kode_unit' => 'PENG', 'keterangan' => 'Pengunjung', 'created_by' => 'system'],
            ['kode_unit' => 'TEN', 'keterangan' => 'Tenant', 'created_by' => 'system'],
        ];
        DB::table('master_units')->insert($units);
    }
}
