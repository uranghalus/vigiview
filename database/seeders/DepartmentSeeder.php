<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $departments = [];

        for ($i = 1; $i <= 50; $i++) {
            $departments[] = [
                'kode' => 'DPT' . str_pad($i, 3, '0', STR_PAD_LEFT),  // Membuat kode DPT001, DPT002, dst
                'keterangan' => 'Departemen ' . $this->getDepartmentName($i), // Menggunakan nama departemen berdasarkan urutan
                'created_date' => Carbon::now(),
                'created_by' => 'admin',
                'modified_date' => Carbon::now(),
                'modified_by' => 'admin',
            ];
        }
        DB::table('departments')->insert($departments);
    }
     // Fungsi untuk mendapatkan nama departemen berdasarkan nomor urut
    private function getDepartmentName($index)
    {
        $names = [
            'Keuangan', 'Sumber Daya Manusia', 'Teknologi Informasi', 'Pemasaran', 'Operasional', 
            'Logistik', 'Produksi', 'Pengembangan Produk', 'Riset dan Pengembangan', 'Layanan Pelanggan',
            'Pendidikan dan Pelatihan', 'Audit Internal', 'Hukum dan Kepatuhan', 'Strategi Bisnis', 'PR dan Media',
            'Pengadaan', 'Sistem Informasi', 'Analisis Bisnis', 'Keamanan', 'Komunikasi Korporat',
            'Manajemen Proyek', 'Kontrol Kualitas', 'Pemasaran Digital', 'Penjualan', 'R&D (Riset dan Pengembangan)',
            'Analisis Data', 'Kesehatan dan Keselamatan Kerja', 'Infrastruktur TI', 'Keamanan Siber', 'Manajemen Risiko',
            'Keuangan dan Investasi', 'Sumber Daya Alam', 'Hubungan Investor', 'Pengembangan Sumber Daya Manusia',
            'Pemrograman', 'Manajemen Aset', 'Desain Grafis', 'Teknik', 'Bahan Baku', 'Sosial dan Lingkungan',
            'Kepatuhan Regulasi', 'Sistem Keuangan', 'Pembelian', 'Manajer Operasional', 'Legal dan Peraturan',
            'Pelayanan Umum', 'Pemasaran Strategis', 'Keamanan Informasi', 'Pelatihan dan Pengembangan', 'Manajer Proyek',
            'Sumber Daya Teknologi', 'Quality Assurance'
        ];

        // Mengambil nama departemen berdasarkan index
        return isset($names[$index % count($names)]) ? $names[$index % count($names)] : 'Departemen ' . $index;
    }
}
