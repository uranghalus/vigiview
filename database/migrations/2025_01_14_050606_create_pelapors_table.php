<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pelapors', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lengkap');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->string('no_telp');
            $table->string('jenis_pengenal');
            $table->string('no_id_pengenal');
            $table->string('tipe_unit');
            $table->string('nama_instansi');
            $table->string('lokasi');
            $table->string('area');
            $table->string('departemen');
            $table->string('jabatan');
            $table->text('catatan')->nullable();
            $table->timestamp('create_date')->useCurrent();
            $table->string('create_user');
            $table->timestamp('modified_date')->nullable()->useCurrentOnUpdate();
            $table->string('modified_user')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelapors');
    }
};
