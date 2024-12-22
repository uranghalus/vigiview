"use client";

import DataTablePagination from "@/Components/DataTablePagination";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    SortingState,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { Department } from ".";
import { router } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";

interface DataTableProps<TData> {
    columns: ColumnDef<TData, any>[];
    data: TData[];
}

export default function DataTable<TData>({
    columns,
    data,
}: DataTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formState, setFormState] = useState({
        id: "", // You can keep it as string initially
        kode: "",
        keterangan: "",
    });
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
        },
    });
    const openDialog = (department: Department | null = null) => {
        setFormState({
            id: "", // Reset `id` as string
            kode: "",
            keterangan: "",
        });
        setIsDialogOpen(true);
    };
    // Close dialog
    const closeDialog = () => {
        setIsDialogOpen(false);
        setFormState({ id: "", kode: "", keterangan: "" });
    };
    // Handle form submission
    const handleSubmit = () => {
        const { id, kode, keterangan } = formState;
        const url = "/master-kejadian/department";
        router.visit(url, {
            method: "post",
            data: { kode, keterangan },
            onSuccess: () => {
                closeDialog();
                // Optionally trigger a page reload or state update after success
            },
            preserveScroll: true,
        });
    };
    return (
        <>
            <div className="flex justify-between items-center w-full mb-4">
                <Input
                    className="w-96"
                    placeholder="Cari semua kolom..."
                    onChange={
                        (e) => table.setGlobalFilter(e.target.value) // Memperbarui global filter
                    }
                />

                <div className="flex items-center gap-4">
                    {/* Optional Button/Actions */}
                    <Button onClick={() => openDialog()}>Tambah Data</Button>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />

            {/* LINK Dialog Tambah Data */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Departemen</DialogTitle>
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
                        <Button onClick={handleSubmit}>Tambah Data</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
