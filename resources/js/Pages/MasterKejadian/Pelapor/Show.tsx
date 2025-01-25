import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
import { Pelapor } from "./PelaporColumn";

interface PelaporProps {
    data_pelapor: Pelapor;
}

const Show: React.FC<PelaporProps> = ({ data_pelapor }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Detail Pelapor" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Detail Pelapor</h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Informasi Pelapor
                        </h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Nama Lengkap
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data_pelapor.nama_lengkap}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Jenis Kelamin
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data_pelapor.jenis_kelamin}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    No. Telp
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data_pelapor.no_telp}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Jenis Pengenal
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data_pelapor.jenis_pengenal}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    No. ID Pengenal
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data_pelapor.no_id_pengenal}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Tipe Unit
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data_pelapor.tipe_unit?.keterangan}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Instansi
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data_pelapor.instansi?.keterangan_instansi}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Departemen
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data_pelapor.departemen?.keterangan}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Jabatan
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data_pelapor.jabatan?.keterangan}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Catatan
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data_pelapor.catatan}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Foto
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <img
                                        src={data_pelapor.foto}
                                        alt={data_pelapor.foto}
                                        className="h-32 w-32 object-cover"
                                    />
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <Link
                    href={route("pelapor.index")}
                    className="mt-4 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                >
                    Kembali
                </Link>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
