<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\MasterData\MasterUnitsController;
use App\Http\Controllers\MasterKejadian\DepartmentController;
use App\Http\Controllers\MasterKejadian\JabatanController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Master Data
    Route::prefix('master-data')->group(function () {
        Route::resource('/data-unit', MasterUnitsController::class);
    });
    // Master Kejadian
    Route::prefix('master-kejadian')->group(function () {
        Route::resource('/department', DepartmentController::class);
        Route::resource('/jabatan', JabatanController::class);
    });
});

require __DIR__ . '/auth.php';
