<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        User::create([
            'name' => 'Admin',
            'email' => 'admin@top.com',
            'password' => 'admin123',
            'role' => 'ADMIN' // Ganti dengan password yang lebih aman
        ]);

        // User::factory(10)->create();
    }
}
