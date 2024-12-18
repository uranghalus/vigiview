import React, { useState } from "react";
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
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Plus } from "lucide-react";

export interface Department {
    id: number;
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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentDepartment, setCurrentDepartment] =
        useState<Department | null>(null);
    const [kode, setKode] = useState("");
    const [keterangan, setKeterangan] = useState("");

    // Open dialog for Add or Edit
    const openDialog = (department: Department | null = null) => {
        if (department) {
            setIsEditing(true);
            setCurrentDepartment(department);
            setKode(department.kode);
            setKeterangan(department.keterangan);
        } else {
            setIsEditing(false);
            setKode("");
            setKeterangan("");
            setCurrentDepartment(null);
        }
        setIsDialogOpen(true);
    };

    // Close dialog
    const closeDialog = () => {
        setIsDialogOpen(false);
        setKode("");
        setKeterangan("");
        setCurrentDepartment(null);
    };

    // Submit form
    const handleSubmit = () => {
        const url =
            isEditing && currentDepartment
                ? `/master-kejadian/department/${currentDepartment.id}` // Update
                : "/master-kejadian/department"; // Create

        const method = isEditing ? "put" : "post"; // HTTP method

        router.visit(url, {
            method,
            data: { kode, keterangan },
            onSuccess: () => closeDialog(),
            preserveScroll: true,
        });
    };
    // Delete department
    const handleDelete = (departmentId: number) => {
        if (confirm("Are you sure you want to delete this department?")) {
            router.delete(`/master-kejadian/department/${departmentId}`, {
                onSuccess: () => {
                    console.log("Department deleted successfully");
                },
                onError: (error) => {
                    console.log("Error deleting department:", error);
                },
                preserveScroll: true,
            });
        }
    };
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
                {/* Search and Add Section */}
                <div className="flex justify-between items-center w-full mb-4">
                    <Input className="w-96" placeholder="Cari departemen..." />
                    <Button onClick={() => openDialog()} className="flex gap-2">
                        <Plus />
                        Tambah Data
                    </Button>
                </div>

                {/* Departments Table */}
                <Table>
                    <TableCaption>Daftar Departemen</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Kode</TableHead>
                            <TableHead>Keterangan</TableHead>
                            <TableHead>Create Date</TableHead>
                            <TableHead>Create By</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {departments.map((department) => (
                            <TableRow key={department.id}>
                                <TableCell className="font-medium">
                                    {department.kode}
                                </TableCell>
                                <TableCell>{department.keterangan}</TableCell>
                                <TableCell>{department.created_date}</TableCell>
                                <TableCell>{department.created_by}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                openDialog(department)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                handleDelete(department.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Dialog for Add/Edit */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {isEditing
                                    ? "Edit Department"
                                    : "Add Department"}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="kode">Kode</Label>
                                <Input
                                    id="kode"
                                    placeholder="Masukkan KODE"
                                    value={kode}
                                    onChange={(e) => setKode(e.target.value)}
                                    disabled={isEditing} // Disable KODE saat edit
                                />
                            </div>
                            <div>
                                <Label htmlFor="keterangan">Keterangan</Label>
                                <Input
                                    id="keterangan"
                                    placeholder="Masukkan Keterangan"
                                    value={keterangan}
                                    onChange={(e) =>
                                        setKeterangan(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" onClick={closeDialog}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit}>
                                {isEditing ? "Update" : "Create"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AuthenticatedLayout>
    );
};

export default DepartmentIndex;
