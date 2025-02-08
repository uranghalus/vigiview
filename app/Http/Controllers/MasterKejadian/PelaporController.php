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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
        $user = Auth::user();
        $validatedData = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'jenis_kelamin' => 'required|string|max:255',
            'no_telp' => 'nullable|string|max:255',
            'jenis_pengenal' => 'nullable|string|max:255',
            'no_id_pengenal' => 'nullable|string|max:255',
            'tipe_unit_id' => 'required|integer',
            'instansi_id' => 'required|integer',
            'departemen_id' => 'required|integer',
            'jabatan_id' => 'required|integer',
            'catatan' => 'nullable|string',
            'foto' => 'nullable|file|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $fileName = time() . '.' . $request->foto->extension();
            $request->file('foto')->storeAs('uploads/pelapor', $fileName, 'public');
            // $request->file('foto')->move(public_path('uploads/pelapor'), $fileName);
            $validatedData['foto'] = $fileName;
        }
        $validatedData['create_user'] = $user->name;

        Pelapor::create($validatedData);

        return redirect()->route('pelapor.index')->with('success', 'Pelapor berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $pelapor)
    {
        $data_pelapor = Pelapor::with(['tipeUnit', 'instansi', 'departemen', 'jabatan'])->findOrFail($pelapor);
        return Inertia::render('MasterKejadian/Pelapor/Show', ['data_pelapor' => $data_pelapor]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pelapor $pelapor)
    {
        return Inertia::render('MasterKejadian/Pelapor/Edit', [
            'pelapor' => $pelapor,
            'units' => MasterUnit::all(),
            'instansi' => MasterInstansi::all(),
            'departemen' => Department::all(),
            'jabatan' => Jabatan::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pelapor $pelapor)
    {
        $user = Auth::user();
        $validatedData = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'jenis_kelamin' => 'required|string|max:255',
            'no_telp' => 'nullable|string|max:255',
            'jenis_pengenal' => 'nullable|string|max:255',
            'no_id_pengenal' => 'nullable|string|max:255',
            'tipe_unit_id' => 'required|integer',
            'instansi_id' => 'required|integer',
            'departemen_id' => 'required|integer',
            'jabatan_id' => 'required|integer',
            'catatan' => 'nullable|string',
            'foto' => 'nullable|file|image|max:512',
        ]);

        if ($request->hasFile('foto')) {
            // Delete old photo if exists
            if ($pelapor->foto) {
                $filePath = 'uploads/pelapor/' . $pelapor->getRawOriginal('foto');
                if (Storage::disk('public')->exists($filePath)) {
                    Storage::disk('public')->delete($filePath);
                }
            }

            $fileName = time() . '.' . $request->foto->extension();
            $request->file('foto')->storeAs('uploads/pelapor', $fileName, 'public');
            $validatedData['foto'] = $fileName;
        }

        $validatedData['update_user'] = $user->name;

        $pelapor->update($validatedData);

        return redirect()->route('pelapor.index')->with('success', 'Pelapor berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pelapor $pelapor)
    {
        //
        if ($pelapor->foto) {
            $filePath = 'uploads/pelapor/' . $pelapor->getRawOriginal('foto');

            if (Storage::disk('public')->exists($filePath)) {
                Storage::disk('public')->delete($filePath);
            } else {
                Log::info('File tidak ditemukan: ' . $filePath);
            }
        }

        $pelapor->delete();

        return redirect()->route('pelapor.index')->with('success', 'Pelapor berhasil dihapus.');
    }
}
