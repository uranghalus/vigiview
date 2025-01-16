<?php

namespace App\Http\Controllers\MasterData;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StoreUnitRequest; // Import the request class

class DataUnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $units = Unit::all();
        return Inertia::render("MasterData/Unit/Index", [
            "units" => $units
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("MasterData/Unit/CreateUnit"); // Ensure the component name matches
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUnitRequest $request)
    {
        Unit::create($request->validated());

        return redirect()->route('data-unit.index')->with('success', 'Unit berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Unit $unit)
    {
        //
        echo json_encode($unit);
        // return Inertia::render('MasterData/Unit/show', [
        //     'unit' => $unit,
        // ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Unit $unit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Unit $unit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Unit $unit)
    {
        //
    }
}
