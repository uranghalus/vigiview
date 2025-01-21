import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

import { Separator } from "@/Components/ui/separator";
import { Pencil, Trash } from "lucide-react";

import { parseDate } from "@/lib/utils";
import { Instansi } from "./InstansiColumn";

type ShowProps = {
    data_instansi: Instansi;
};

const Show: React.FC<ShowProps> = ({ data_instansi }) => {
    console.log("data_instansi:", data_instansi); // Log the data_instansi prop

    if (!data_instansi) {
        return (
            <AuthenticatedLayout>
                <Head title="Lihat Data Instansi" />
                <Card>
                    <CardHeader>
                        <CardTitle>Data Instansi Tidak Ditemukan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600">
                            Data instansi tidak tersedia.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Link
                            href={route("data-instansi.index")}
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
            <Head title="Lihat Data Instansi" />
            <Card>
                <CardHeader>
                    <CardTitle>Lihat Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <h1 className="text-sm font-medium text-gray-600 mb-2">
                        Informasi Data
                    </h1>
                    <dl className="p-4 rounded-lg bg-white border border-gray-100 space-y-2 ">
                        <dt className="font-bold text-gray-800 text-lg">
                            Kode Instansi
                        </dt>
                        <dd className="text-gray-600 text-sm">
                            {data_instansi.kode_instansi}
                        </dd>
                        <dt className="font-bold text-gray-800 text-lg">
                            Keterangan
                        </dt>
                        <dd className="text-gray-600 text-sm">
                            {data_instansi.keterangan_instansi}
                        </dd>
                        <dt className="font-bold text-gray-800 text-lg">
                            Lokasi
                        </dt>
                        <dd className="text-gray-600 text-sm">
                            {data_instansi.lokasi}
                        </dd>
                        <dt className="font-bold text-gray-800 text-lg">
                            Area
                        </dt>
                        <dd className="text-gray-600 text-sm">
                            {data_instansi.area}
                        </dd>
                    </dl>
                    <Separator className="my-3" />
                    <h1 className="text-sm font-medium text-gray-600 mb-2">
                        Informasi Tanggal Data
                    </h1>
                    <dl className="p-4 rounded-lg bg-white border border-gray-100 space-y-2 ">
                        <dt className="font-bold text-gray-800 text-lg">
                            Tanggal Dibuat / Pembuat
                        </dt>
                        <dd className="text-gray-600 text-sm">
                            {parseDate(data_instansi.created_at)} /{" "}
                            {data_instansi.created_by}
                        </dd>
                        <dt className="font-bold text-gray-800 text-lg">
                            Tanggal Modifikasi / Pengubah
                        </dt>
                        <dd className="text-gray-600 text-sm">
                            {parseDate(data_instansi.updated_at)} /{" "}
                            {data_instansi.updated_by}
                        </dd>
                    </dl>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Link
                        href={route("data-instansi.index")}
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-yellow-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Kembali
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("data-instansi.edit", data_instansi.id)}
                            className="text-white inline-flex items-center bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                        >
                            <Pencil className="mr-1 -ml-1 w-5 h-5" />
                            Edit
                        </Link>
                        <Link
                            href={route(
                                "data-instansi.destroy",
                                data_instansi.id
                            )}
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
