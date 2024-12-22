import React, { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

import DataTable from "./data-table";
import { columns } from "./Column";
import { getDeviceInfo } from "@/lib/utils";

export interface Department {
    id: number | string;
    kode: string;
    keterangan: string;
    created_date: string;
    created_by: string;
    modified_date: string | null;
    modified_by: string | null;
}

interface Props {
    departments: Department[];
}

const DepartmentIndex: React.FC<Props> = ({ departments }) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Data Departemen
                </h2>
            }
        >
            <Head title="Data Departemen" />
            <h1 className="text-2xl font-bold mb-4">Departments</h1>
            <div className="p-5 rounded-lg bg-white shadow-md">
                {/* Departments Table */}
                <DataTable columns={columns} data={departments} table />
            </div>
        </AuthenticatedLayout>
    );
};

export default DepartmentIndex;
