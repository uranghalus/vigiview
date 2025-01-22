import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import PelaporTable from "./PelaporTable";
import { PelaporColumns } from "./PelaporColumn";
interface Pelapor {
    id: number;
    nama_lengkap: string;
    jenis_kelamin: string;
    no_telp: string;
    tipe_unit?: { keterangan: string };
    instansi?: { keterangan_instansi: string };
}
interface PelaporTableProps {
    data: Pelapor[];
}
const Index: React.FC<PelaporTableProps> = ({ data }) => {
    return (
        <AuthenticatedLayout header={null}>
            <Head title="Data Pelapor" />
            <h1 className="text-2xl font-bold mb-4">
                Data Pelapor, Korban,Pelaku
            </h1>
            <PelaporTable data={data} columns={PelaporColumns} />
        </AuthenticatedLayout>
    );
};

export default Index;
