<?php

namespace App\Http\Controllers\MasterKejadian;

use App\Http\Controllers\Controller;
use App\Models\Jabatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JabatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        //
        $jabatans = Jabatan::latest()->get();
        return Inertia::render('MasterKejadian/Jabatan/index', [
            'jabatans' => $jabatans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('MasterKejadian/Jabatan/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'kode' => 'required|string|unique:jabatan,kode|max:255',
            'keterangan' => 'required|string',
        ]);

        try {
            Jabatan::create([
                'kode' => $validated['kode'],
                'keterangan' => $validated['keterangan'],
                'create' => $user->name,
            ]);

            return redirect()->back()->with('success', 'Jabatan berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Jabatan $jabatan)
    {
        //
        return Inertia::render('MasterKejadian/Jabatan/show', [
            'jabatan' => $jabatan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jabatan $jabatan)
    {
        //
        return inertia('MasterKejadian/Jabatan/Edit', ['jabatan' => $jabatan]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Jabatan $jabatan)
    {
        //
        $user = Auth::user();

        $validated = $request->validate([
            'kode' => 'required|string|unique:jabatan,kode|max:255',
            'keterangan' => 'required|string',
        ]);
        try {
            $jabatan->update([
                'kode' => $validated['kode'],
                'keterangan' => $validated['keterangan'],
                'modified_date' => now(),
                'modified' => $user->name,
            ]);
            return redirect()->back()->with('success', 'Jabatan berhasil diubah');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jabatan $jabatan)
    {
        //
        try {
            $jabatan->delete();
            return redirect()->back()->with('success', 'Jabatan berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat menghapus data']);
        }
    }
}
