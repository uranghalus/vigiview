import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import DataTable from "./data-table";
import { Unit, UnitColumns } from "./UnitColumns";

interface UnitProps {
    units: Unit[];
}
const Index: React.FC<UnitProps> = ({ units }) => {
    return (
        <AuthenticatedLayout header={null}>
            <Head title="Data Unit" />
            <h1 className="text-2xl font-bold mb-4">Master Unit</h1>
            <DataTable columns={UnitColumns} data={units} />
        </AuthenticatedLayout>
    );
};

export default Index;
