import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Link, router } from "@inertiajs/react";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash } from "lucide-react";

export type Jabatan = {
    id: number;
    kode: string;
    keterangan: string;
    create_date: string;
    create: string;
    modified_date: string | null;
    modified: string | null;
};

export const JabatanColumn: ColumnDef<Jabatan>[] = [
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
        accessorKey: "create_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date Create" />
        ),
    },
    {
        accessorKey: "create",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Create By" />
        ),
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => (
            <div className="inline-flex rounded-lg shadow-sm">
                <Link
                    href={`/master-kejadian/jabatan/${row.original.id}`}
                    className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-l-lg text-sm font-medium focus:z-10 border border-emerald-700 bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-emerald-800 dark:border-emerald-700 dark:hover:bg-emerald-900 dark:focus:ring-emerald-600"
                    title="lihat data"
                >
                    <Eye className="size-5" />
                </Link>
                <Link
                    href={`/master-kejadian/jabatan/${row.original.id}/edit`}
                    className="py-2 px-3 inline-flex justify-center items-center gap-2 text-sm font-medium focus:z-10 border border-amber-600 bg-amber-500 text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-amber-700 dark:border-amber-600 dark:text-white dark:hover:bg-amber-800 dark:focus:ring-amber-500"
                    title="Edit Data"
                >
                    <Pencil className="size-5" />
                </Link>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-r-lg text-sm font-medium focus:z-10 border border-red-600 bg-red-600 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-red-700 dark:border-red-600 dark:text-white dark:hover:bg-red-800 dark:focus:ring-red-500">
                            <Trash className="size-5" />
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Anda Yakin Ingin Menghapus Data Ini?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Data yang sudah dihapus tidak dapat
                                dikembalikan.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal Hapus</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-red-500 hover:bg-red-700"
                                onClick={() => handleDelete(row.original.id)}
                            >
                                Ya Hapus Data
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        ),
    },
];

// Delete Handler
const handleDelete = (id: number) => {
    router.delete(`/master-kejadian/jabatan/${id}`, {
        onSuccess: () => {
            console.log("jabatan deleted successfully");
        },
        onError: (error) => {
            console.log("Error deleting jabatan:", error);
        },
    });
};
