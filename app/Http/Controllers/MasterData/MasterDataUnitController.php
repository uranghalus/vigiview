<?php

namespace App\Http\Controllers\MasterData;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUnitRequest;
use App\Models\MasterUnit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class MasterDataUnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $units = MasterUnit::all();
        return Inertia::render("MasterData/Unit/Index", [
            "units" => $units
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render("MasterData/Unit/CreateUnit");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUnitRequest $request)
    {
        //
        $user = Auth::user();
        MasterUnit::create([
            'kode_unit' => $request['kode_unit'],
            'keterangan' => $request['keterangan'],
            'created_by' => $user->name,
        ]);

        return redirect()->route('data-unit.index')->with('success', 'Unit berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(MasterUnit $data_unit)
    {
        return Inertia::render('MasterData/Unit/show', [
            'data_unit' => $data_unit,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MasterUnit $data_unit)
    {
        //
        return Inertia::render('MasterData/Unit/Edit', [
            'data_unit' => $data_unit,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MasterUnit $data_unit)
    {
        //
        $user = Auth::user();
        $data_unit->update([
            'kode_unit' => $request['kode_unit'],
            'keterangan' => $request['keterangan'],
            'updated_by' => $user->name,
        ]);
        return redirect()->route('data-unit.index')->with('success', 'Unit berhasil diubah.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MasterUnit $data_unit)
    {
        //Delete Data
        $data_unit->delete();
        return redirect()->route('data-unit.index')->with('success', 'Unit berhasil dihapus.');
    }
}
