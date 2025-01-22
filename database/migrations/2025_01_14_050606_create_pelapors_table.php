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
            $table->unsignedBigInteger('tipe_unit_id'); // Foreign key to master_units
            $table->unsignedBigInteger('instansi_id'); // Foreign key to master_instansi
            $table->unsignedBigInteger('departemen_id'); // Foreign key to departemen
            $table->unsignedBigInteger('jabatan_id'); // Foreign key to jabatan
            $table->text('catatan')->nullable();
            $table->string('foto')->nullable();
            $table->timestamp('create_date')->useCurrent();
            $table->string('create_user');
            $table->timestamp('modified_date')->nullable()->useCurrentOnUpdate();
            $table->string('modified_user')->nullable();
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('tipe_unit_id')->references('id')->on('master_units')->onDelete('cascade');
            $table->foreign('instansi_id')->references('id')->on('master_instansi')->onDelete('cascade');
            $table->foreign('departemen_id')->references('id')->on('departments')->onDelete('cascade');
            $table->foreign('jabatan_id')->references('id')->on('jabatan')->onDelete('cascade');
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
