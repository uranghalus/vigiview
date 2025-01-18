import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import InstansiTable from "./InstansiTable";
import { Instansi, InstansiColumns } from "./InstansiColumn";
interface InstansiProps {
    data: Instansi[];
}
const Index: React.FC<InstansiProps> = ({ data }) => {
    return (
        <AuthenticatedLayout header={null}>
            <Head title="Data Instansi" />
            <h1 className="text-2xl font-bold mb-4">Master Instansi</h1>
            <InstansiTable columns={InstansiColumns} data={data} />
        </AuthenticatedLayout>
    );
};

export default Index;
