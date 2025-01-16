import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import DataTable from "./data-table";
import { JabatanColumn } from "./Column";
export interface Jabatan {
    id: number | string;
    kode: string;
    keterangan: string;
    create_date: string;
    create: string;
    modified_date: string | null;
    modified: string | null;
}
interface Props {
    jabatans: Jabatan[];
}
const index: React.FC<Props> = ({ jabatans }) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Data Departemen
                </h2>
            }
        >
            <Head title="Data Jabatan" />
            <h1 className="text-2xl font-bold mb-4">Master Jabatan</h1>
            <div className="p-5 rounded-lg bg-white shadow-md">
                <DataTable columns={JabatanColumn} data={jabatans} />
            </div>
        </AuthenticatedLayout>
    );
};

export default index;
