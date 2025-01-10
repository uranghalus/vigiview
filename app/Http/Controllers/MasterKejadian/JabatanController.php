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
        //
        $user = Auth::user();
        $request->validate([
            'kode' => 'required|string|unique:departments,kode|max:255',
            'keterangan' => 'required|string',
        ]);

        Jabatan::create([
            'kode' => $request->kode,
            'keterangan' => $request->keterangan,
            'create' => $user->name,
        ]);

        return back()->with('success', 'Department created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Jabatan $jabatan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jabatan $jabatan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Jabatan $jabatan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jabatan $jabatan)
    {
        //
    }
}
