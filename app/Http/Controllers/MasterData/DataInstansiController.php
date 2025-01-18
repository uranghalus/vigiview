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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(MasterInstansi $masterInstansi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MasterInstansi $masterInstansi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MasterInstansi $masterInstansi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MasterInstansi $masterInstansi)
    {
        //
    }
}
