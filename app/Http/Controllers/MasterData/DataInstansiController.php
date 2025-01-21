<?php

namespace App\Http\Controllers\MasterData;

use App\Http\Controllers\Controller;
use App\Models\MasterInstansi;
use App\Models\MasterUnit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataInstansiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = MasterInstansi::all();
        return Inertia::render('MasterData/DataInstansi/Index', ['data' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $data = MasterUnit::all();
        return Inertia::render('MasterData/DataInstansi/Create', ['unit_data' => $data]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_instansi' => 'required|string|max:255',
            'keterangan_instansi' => 'required|string|max:255',
            'lokasi' => 'nullable|string|max:255',
            'area' => 'nullable|string|max:255',
            'unit_id' => 'required|exists:master_units,id',
        ]);

        MasterInstansi::create($validated);

        return redirect()->route('data-instansi.index')->with('success', 'Instansi berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(MasterInstansi $data_instansi)
    {
        //
        return Inertia::render('MasterData/DataInstansi/Show', ['data_instansi' => $data_instansi]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MasterInstansi $data_instansi)
    {
        $unit_data = MasterUnit::all();
        return Inertia::render('MasterData/DataInstansi/Edit', [
            'data_instansi' => $data_instansi,
            'unit_data' => $unit_data,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MasterInstansi $data_instansi)
    {
        //
        $validated = $request->validate([
            'kode_instansi' => 'required|string|max:255',
            'keterangan_instansi' => 'required|string|max:255',
            'lokasi' => 'nullable|string|max:255',
            'area' => 'nullable|string|max:255',
            'unit_id' => 'required|exists:master_units,id',
        ]);
        $data_instansi->update($validated);
        return redirect()->route('data-instansi.index')->with('success', 'Instansi berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MasterInstansi $data_instansi)
    {
        //
        $data_instansi->delete();
        return redirect()->route('data-instansi.index')->with('success', 'Instansi berhasil dihapus');
    }
}
