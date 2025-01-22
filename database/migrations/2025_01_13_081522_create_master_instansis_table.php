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
        Schema::create('master_instansi', function (Blueprint $table) {
            $table->id();
            $table->string('kode_instansi')->unique();
            $table->string('keterangan_instansi')->nullable();
            $table->string('lokasi')->nullable();
            $table->string('area')->nullable();
            $table->unsignedBigInteger('unit_id'); // Ensure the column type matches the referenced column
            $table->foreign('unit_id')->references('id')->on('master_units')->onDelete('cascade'); // Add foreign key relation
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_instansi');
    }
};
