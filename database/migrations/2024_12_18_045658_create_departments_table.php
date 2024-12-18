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
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('kode')->unique(); // KODE
            $table->string('keterangan'); // KETERANGAN
            $table->timestamp('created_date')->useCurrent(); // CREATE DATE
            $table->string('created_by'); // CREATE
            $table->timestamp('modified_date')->nullable()->useCurrent(); // MODIFIED DATE
            $table->string('modified_by')->nullable(); // MODIFIED
            $table->timestamps(); // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departments');
    }
};
