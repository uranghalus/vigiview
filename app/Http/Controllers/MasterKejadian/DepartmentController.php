<?php

namespace App\Http\Controllers\MasterKejadian;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $departments = Department::latest()->get();
        return Inertia::render('MasterKejadian/Department/index', [
            'departments' => $departments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'kode' => 'required|string|unique:departments,kode|max:255',
            'keterangan' => 'required|string',
        ]);

        Department::create([
            'kode' => $request->kode,
            'keterangan' => $request->keterangan,
            'created_by' => $user->name,
        ]);

        return back()->with('success', 'Department created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        //
        $user = Auth::user();
        $request->validate([
            'kode' => 'required|string|max:255|unique:departments,kode,' . $department->id,
            'keterangan' => 'required|string|max:500', // Batas keterangan 500 karakter
        ], [
            'kode.required' => 'Kode wajib diisi.',
            'kode.unique' => 'Kode sudah digunakan oleh department lain.',
            'keterangan.required' => 'Keterangan wajib diisi.',
        ]);

        $department->update([
            'kode' => $request->kode,
            'keterangan' => $request->keterangan,
            'updated_by' => $user->name, // Gunakan name atau atribut lain
        ]);

        return redirect()->route('department.index')->with('success', 'Departemen berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        //
        $department->delete(); // Menghapus departemen

        return redirect()->route('department.index')->with('success', 'Departemen berhasil dihapus!');
    }
}
