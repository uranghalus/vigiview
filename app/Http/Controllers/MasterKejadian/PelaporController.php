<?php

namespace App\Http\Controllers\MasterKejadian;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Jabatan;
use App\Models\MasterInstansi;
use App\Models\MasterUnit;
use App\Models\Pelapor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PelaporController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = Pelapor::with(['tipeUnit', 'instansi', 'departemen', 'jabatan'])->get();
        return Inertia::render('MasterKejadian/Pelapor/Index', ['data' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('MasterKejadian/Pelapor/Create', [
            'units' => MasterUnit::all(),
            'instansi' => MasterInstansi::all(),
            'departemen' => Department::all(),
            'jabatan' => Jabatan::all(),
        ]);
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
