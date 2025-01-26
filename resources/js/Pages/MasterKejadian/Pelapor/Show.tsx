import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
import { Pelapor } from "./PelaporColumn";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Pencil, Trash } from "lucide-react";

interface PelaporProps {
    data_pelapor: Pelapor;
}

const Show: React.FC<PelaporProps> = ({ data_pelapor }) => {
    if (!data_pelapor) {
        return (
            <AuthenticatedLayout>
                <Head title="Lihat Data Pelapor" />
                <Card>
                    <CardHeader>
                        <CardTitle>Data Pelapor Tidak Ditemukan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600">
                            Data Pelapor tidak tersedia.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Link
                            href={route("pelapor.index")}
                            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-yellow-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Kembali
                        </Link>
                    </CardFooter>
                </Card>
            </AuthenticatedLayout>
        );
    }
    return (
        <AuthenticatedLayout>
            <Head title="Detail Pelapor" />
            <Card>
                <CardHeader>
                    <CardTitle>Lihat Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <h1 className="text-sm font-medium text-gray-600 mb-2">
                        Informasi Pelapor/Korban/Pelaku
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <dl className="p-4 rounded-lg bg-white border border-gray-100 space-y-2 col-span-2">
                            <dt className="font-bold text-gray-800 text-lg">
                                Nama Lengkap
                            </dt>
                            <dd className="text-gray-600 text-sm">
                                {data_pelapor.nama_lengkap}
                            </dd>
                            <dt className="font-bold text-gray-800 text-lg">
                                Jenis Kelamin
                            </dt>
                            <dd className="text-gray-600 text-sm">
                                {data_pelapor.jenis_kelamin}
                            </dd>
                            <dt className="font-bold text-gray-800 text-lg">
                                Jenis Pengenal
                            </dt>
                            <dd className="text-gray-600 text-sm">
                                {data_pelapor.jenis_pengenal}
                            </dd>
                            <dt className="font-bold text-gray-800 text-lg">
                                No. ID Pengenal
                            </dt>
                            <dd className="text-gray-600 text-sm">
                                {data_pelapor.no_id_pengenal}
                            </dd>
                        </dl>
                        <dl className="p-4 rounded-lg bg-white border border-gray-100 space-y-2 ">
                            <dt className="font-bold text-gray-800 text-lg">
                                Foto
                            </dt>
                            <dd className="flex justify-center">
                                <img
                                    src={data_pelapor.foto}
                                    alt={data_pelapor.foto}
                                    className="h-auto w-44 object-cover"
                                />
                            </dd>
                        </dl>
                    </div>
                    <h1 className="text-sm font-medium text-gray-600 mb-2">
                        Informasi Lainnya
                    </h1>
                    <dl className="p-4 rounded-lg bg-white border border-gray-100 space-y-2 col-span-2">
                        <dt className="font-bold text-gray-800 text-lg">
                            No. Telp
                        </dt>
                        <dd className="text-gray-600 text-sm">
                            {data_pelapor.no_telp}
                        </dd>
                        <dt className="font-bold text-gray-800 text-lg">
                            Tipe Unit
                        </dt>
                        <dd className="text-gray-600 text-sm">
                            {data_pelapor.tipe_unit?.keterangan}
                        </dd>
                        <dt className="font-bold text-gray-800 text-lg">
                            Instansi
                        </dt>
                        <dd className="text-gray-600 text-sm">
                            {data_pelapor.instansi?.keterangan_instansi}
                        </dd>
                        <dt className="font-bold text-gray-800 text-lg">
                            Departemen
                        </dt>
                        <dd className="text-gray-600 text-sm">
                            {data_pelapor.departemen?.keterangan}
                        </dd>
                        <dt className="font-bold text-gray-800 text-lg">
                            Jabatan
                        </dt>
                        <dd className="text-gray-600 text-sm">
                            {data_pelapor.jabatan?.keterangan}
                        </dd>
                        <dt className="font-bold text-gray-800 text-lg">
                            Catatan
                        </dt>
                        <dd className="text-gray-600 text-sm">
                            {data_pelapor.catatan}
                        </dd>
                    </dl>
                    <h1 className="text-sm font-medium text-gray-600 mb-2">
                        Informasi Data
                    </h1>
                    <dl
                        className="p-4 rounded-lg bg-white border border-gray-100 space-y-
                    2 col-span-2"
                    >
                        <dt className="font-bold text-gray-800 text-lg">
                            Dibuat Pada / Pembuat
                        </dt>
                        <dd className="text-gray-600 text-sm">
                            {data_pelapor.create_date} /{" "}
                            {data_pelapor.create_user}
                        </dd>
                        <dt className="font-bold text-gray-800 text-lg">
                            Diubah Pada / Pembuat
                        </dt>
                        <dd className="text-gray-600 text-sm">
                            {data_pelapor.modified_date} /
                            {data_pelapor.modified_user}
                        </dd>
                    </dl>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Link
                        href={route("pelapor.index")}
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-yellow-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Kembali
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("pelapor.edit", data_pelapor.id)}
                            className="text-white inline-flex items-center bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                        >
                            <Pencil className="mr-1 -ml-1 w-5 h-5" />
                            Edit
                        </Link>
                        <Link
                            href={route("pelapor.destroy", data_pelapor.id)}
                            className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >
                            <Trash className="mr-1 -ml-1 w-5 h-5" />
                            Delete
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Show;
