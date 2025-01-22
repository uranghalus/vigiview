import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Save } from "lucide-react";

import { Unit } from "@/Pages/MasterData/Unit/UnitColumns";
import { Instansi } from "@/Pages/MasterData/DataInstansi/InstansiColumn";
import { Departement } from "../Department/Column";
import { Jabatan } from "../Jabatan/Column";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

export const pelaporSchema = z.object({
    nama_lengkap: z.string().min(1, "Nama Lengkap is required"),
    jenis_kelamin: z.string().min(1, "Jenis Kelamin is required"),
    no_telp: z.string().optional(),
    jenis_pengenal: z.string().optional(),
    no_id_pengenal: z.string().optional(),
    tipe_unit_id: z.string().min(1, "Tipe Unit ID is required"),
    instansi_id: z.string().min(1, "Instansi ID is required"),
    departemen_id: z.string().min(1, "Departemen ID is required"),
    jabatan_id: z.string().min(1, "Jabatan ID is required"),
    catatan: z.string().optional(),
    foto: z.string().optional(),
});

interface CreatePelaporProps {
    units: Unit[];
    instansi: Instansi[];
    departemen: Departement[];
    jabatan: Jabatan[];
}

const Create: React.FC<CreatePelaporProps> = ({
    units = [],
    instansi = [],
    departemen = [],
    jabatan = [],
}) => {
    const form = useForm<z.infer<typeof pelaporSchema>>({
        resolver: zodResolver(pelaporSchema),
        defaultValues: {
            nama_lengkap: "",
            jenis_kelamin: "",
            no_telp: "",
            jenis_pengenal: "",
            no_id_pengenal: "",
            tipe_unit_id: "",
            instansi_id: "",
            departemen_id: "",
            jabatan_id: "",
            catatan: "",
            foto: "",
        },
    });

    const [filteredInstansi, setFilteredInstansi] = useState<Instansi[]>([]);

    useEffect(() => {
        const selectedUnitId = form.watch("tipe_unit_id");
        if (selectedUnitId) {
            setFilteredInstansi(
                instansi.filter(
                    (inst) => inst.unit_id === parseInt(selectedUnitId)
                )
            );
        } else {
            setFilteredInstansi([]);
        }
    }, [form.watch("tipe_unit_id"), instansi]);

    function onSubmit(values: z.infer<typeof pelaporSchema>) {
        router.post("/master-kejadian/pelapor", values, {
            onSuccess: () => {
                toast.success("Pelapor berhasil ditambahkan", {
                    description: "Data pelapor berhasil disimpan.",
                    action: {
                        label: "Lihat Data",
                        onClick: () => router.visit("/master-kejadian/pelapor"),
                    },
                });
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => {
                    toast.error(error);
                });
            },
            preserveScroll: true,
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Create Pelapor" />
            <Card>
                <CardHeader>
                    <CardTitle>Create Pelapor</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="nama_lengkap"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Lengkap</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nama Lengkap"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="jenis_kelamin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jenis Kelamin</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Jenis Kelamin"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="no_telp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>No. Telp</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="No. Telp"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="jenis_pengenal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Jenis Pengenal
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih Unit" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="KTP">
                                                            KTP
                                                        </SelectItem>
                                                        <SelectItem value="SIM">
                                                            SIM
                                                        </SelectItem>
                                                        <SelectItem value="Passport">
                                                            Passport
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="no_id_pengenal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                No. ID Pengenal
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="No. ID Pengenal"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="tipe_unit_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipe Unit</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih Unit" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {units.map((unit) => (
                                                        <SelectItem
                                                            value={unit.id.toString()}
                                                            key={unit.id}
                                                        >
                                                            {unit.keterangan}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="instansi_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Instansi</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih Instansi" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {filteredInstansi.map(
                                                        (inst) => (
                                                            <SelectItem
                                                                value={inst.id.toString()}
                                                                key={inst.id}
                                                            >
                                                                {inst.kode_instansi +
                                                                    " - " +
                                                                    inst.keterangan_instansi}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="departemen_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Departemen</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih Departemen" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {departemen.map((dept) => (
                                                        <SelectItem
                                                            value={dept.id.toString()}
                                                            key={dept.id}
                                                        >
                                                            {dept.keterangan}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="jabatan_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Jabatan</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih Jabatan" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {jabatan.map((jab) => (
                                                        <SelectItem
                                                            value={jab.id.toString()}
                                                            key={jab.id}
                                                        >
                                                            {jab.keterangan}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="catatan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Catatan</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Catatan" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="foto"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Foto</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Foto"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex items-center justify-between">
                            <Link
                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600"
                                href={route("pelapor.index")}
                            >
                                Kembali
                            </Link>
                            <Button type="submit">
                                <Save className="size-6" /> Simpan Data
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Create;
