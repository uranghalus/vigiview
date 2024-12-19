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
import FilterDropdown from "@/Components/filter-dropdown";

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentDepartment, setCurrentDepartment] =
        useState<Department | null>(null);
    const [filters, setFilters] = useState<string[]>([]);
    const filterOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];
    // Grouping state into a single object, but with `id` as `string` or `number`
    const [formState, setFormState] = useState({
        id: "", // You can keep it as string initially
        kode: "",
        keterangan: "",
    });
    const handleFilterChange = (selectedFilters: string[]) => {
        setFilters(selectedFilters);
        console.log("Selected filters:", selectedFilters);
        // Perform filtering logic here based on selectedFilters
    };
    // Open dialog for Add or Edit
    const openDialog = (department: Department | null = null) => {
        if (department) {
            setIsEditing(true);
            setCurrentDepartment(department);
            setFormState({
                id: department.id.toString(), // Ensuring `id` is treated as string
                kode: department.kode,
                keterangan: department.keterangan,
            });
        } else {
            setIsEditing(false);
            setFormState({
                id: "", // Reset `id` as string
                kode: "",
                keterangan: "",
            });
            setCurrentDepartment(null);
        }
        setIsDialogOpen(true);
    };

    // Close dialog
    const closeDialog = () => {
        setIsDialogOpen(false);
        setFormState({ id: "", kode: "", keterangan: "" });
        setCurrentDepartment(null);
    };

    // Handle form submission
    const handleSubmit = () => {
        const { id, kode, keterangan } = formState;
        const url =
            isEditing && currentDepartment
                ? `/master-kejadian/department/${currentDepartment.id}` // Update
                : "/master-kejadian/department"; // Create

        const method = isEditing ? "put" : "post"; // HTTP method

        router.visit(url, {
            method,
            data: { kode, keterangan },
            onSuccess: () => {
                closeDialog();
                // Optionally trigger a page reload or state update after success
            },
            preserveScroll: true,
        });
    };

    // Handle department deletion
    const handleDelete = (departmentId: number | string) => {
        if (confirm("Are you sure you want to delete this department?")) {
            router.delete(`/master-kejadian/department/${departmentId}`, {
                onSuccess: () => {
                    console.log("Department deleted successfully");
                    // You might want to update the UI after deletion
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

                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => openDialog()}
                            className="flex gap-2"
                            size={"sm"}
                        >
                            <Plus />
                            Tambah Data
                        </Button>
                        <FilterDropdown
                            options={filterOptions}
                            onFilterChange={handleFilterChange}
                        />
                    </div>
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
                                    value={formState.kode}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            kode: e.target.value,
                                        })
                                    } // Disable KODE saat edit
                                />
                            </div>
                            <div>
                                <Label htmlFor="keterangan">Keterangan</Label>
                                <Input
                                    id="keterangan"
                                    placeholder="Masukkan Keterangan"
                                    value={formState.keterangan}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            keterangan: e.target.value,
                                        })
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
