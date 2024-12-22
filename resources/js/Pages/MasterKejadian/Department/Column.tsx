import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { router, useForm } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash } from "lucide-react";

export type Departement = {
    id: number;
    kode: string;
    keterangan: string;
    created_date: string;
    created_by: string;
    modified_date: string | null;
    modified_by: string | null;
};

export const columns: ColumnDef<Departement>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "kode",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kode Dept" />
        ),
    },
    {
        accessorKey: "keterangan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Keterangan" />
        ),
    },
    {
        accessorKey: "created_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date Create" />
        ),
    },
    {
        accessorKey: "created_by",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Create By" />
        ),
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => (
            <div className="inline-flex rounded-md shadow-sm" role="group">
                {/* View Button */}
                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-l-lg hover:bg-blue-700 hover:border-blue-700 focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                        >
                            <Eye className="w-4 h-4 me-2" />
                            Lihat
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>View Department</DialogTitle>
                        </DialogHeader>
                        <div className="p-6 space-y-2">
                            <p>ID: {row.original.id}</p>
                            <p>Kode: {row.original.kode}</p>
                            <p>Keterangan: {row.original.keterangan}</p>
                            <p>Created Date: {row.original.created_date}</p>
                            <p>Created By: {row.original.created_by}</p>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="secondary">Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Button */}
                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-yellow-500 bg-white border border-yellow-500 rounded-none hover:bg-yellow-500 hover:text-white focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                        >
                            <Pencil className="w-4 h-4 me-2" />
                            Edit
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Department</DialogTitle>
                        </DialogHeader>
                        <EditForm department={row.original} />
                    </DialogContent>
                </Dialog>

                {/* Delete Button */}
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-500 bg-white border border-red-500 rounded-r-lg hover:bg-red-500 hover:text-white focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={() => handleDelete(row.original.id)}
                >
                    <Trash className="w-4 h-4 me-2" />
                    Hapus
                </button>
            </div>
        ),
    },
];

// Edit Form Component
const EditForm = ({ department }: { department: Departement }) => {
    const { data, setData, put, processing, errors } = useForm({
        kode: department.kode,
        keterangan: department.keterangan,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(`/master-kejadian/department/${department.id}`, {
            onSuccess: () => {
                console.log("Department updated successfully");
                // Optionally close the dialog or refresh the data
            },
            onError: (error) => {
                console.error("Error updating department:", error);
            },
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="kode">Kode</Label>
                <Input
                    id="kode"
                    name="kode"
                    placeholder="Masukkan KODE"
                    value={data.kode}
                    onChange={handleChange}
                />
                {errors.kode && (
                    <p className="text-red-500 text-sm">{errors.kode}</p>
                )}
            </div>
            <div>
                <Label htmlFor="keterangan">Keterangan</Label>
                <Input
                    id="keterangan"
                    name="keterangan"
                    placeholder="Masukkan Keterangan"
                    value={data.keterangan}
                    onChange={handleChange}
                />
                {errors.keterangan && (
                    <p className="text-red-500 text-sm">{errors.keterangan}</p>
                )}
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="secondary">Close</Button>
                </DialogClose>
                <Button type="submit" disabled={processing}>
                    {processing ? "Saving..." : "Save Changes"}
                </Button>
            </DialogFooter>
        </form>
    );
};

// Delete Handler
const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this department?")) {
        router.delete(`/departments/${id}`, {
            onSuccess: () => {
                console.log("Department deleted successfully");
            },
            onError: (error) => {
                console.log("Error deleting department:", error);
            },
        });
    }
};
