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
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Pelapor } from "./PelaporColumn";

export const pelaporSchema = z.object({
    nama_lengkap: z.string().min(1, "Nama Lengkap is required"),
    jenis_kelamin: z.enum(["Laki-Laki", "Perempuan"], {
        required_error: "Jenis Kelamin is required",
    }),
    no_telp: z.string().optional(),
    jenis_pengenal: z.string().optional(),
    no_id_pengenal: z.string().optional(),
    tipe_unit_id: z.string().min(1, "Tipe Unit ID is required"),
    instansi_id: z.string().min(1, "Instansi ID is required"),
    departemen_id: z.string().min(1, "Departemen ID is required"),
    jabatan_id: z.string().min(1, "Jabatan ID is required"),
    catatan: z.string().optional(),
    foto: z
        .any()
        .refine(
            (file) => file instanceof File && file.type.startsWith("image/"),
            {
                message: "Foto must be an image file",
            }
        )
        .refine((file) => file.size <= 500 * 1024, {
            message: "Foto size must be less than 500KB",
        }),
});

interface EditPelaporProps {
    pelapor: Pelapor;
    units: Unit[];
    instansi: Instansi[];
    departemen: Departement[];
    jabatan: Jabatan[];
}

const Edit: React.FC<EditPelaporProps> = ({
    units = [],
    instansi = [],
    departemen = [],
    jabatan = [],
    pelapor,
}) => {
    const form = useForm<z.infer<typeof pelaporSchema>>({
        resolver: zodResolver(pelaporSchema),
        defaultValues: {
            nama_lengkap: pelapor.nama_lengkap,
            jenis_kelamin: pelapor.jenis_kelamin as "Laki-Laki" | "Perempuan",
            no_telp: pelapor.no_telp,
            jenis_pengenal: pelapor.jenis_pengenal,
            no_id_pengenal: pelapor.no_id_pengenal,
            tipe_unit_id: pelapor.tipe_unit_id.toString(),
            instansi_id: pelapor.instansi_id.toString(),
            departemen_id: pelapor.departemen?.id.toString(),
            jabatan_id: pelapor.jabatan?.id.toString(),
            catatan: pelapor.catatan,
            foto: pelapor.foto,
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
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, (values as any)[key]);
        });

        router.patch(`/master-kejadian/pelapor/${pelapor.id}`, formData, {
            onSuccess: () => {
                toast.success("Pelapor berhasil diperbarui", {
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
            <Head title="Edit Pelapor" />
            <Card>
                <CardHeader>
                    <CardTitle>Edit Pelapor</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        encType="multipart/form-data"
                    >
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
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Laki-Laki" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Laki-Laki
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Perempuan" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Perempuan
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
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
                                                onValueChange={(value) =>
                                                    field.onChange(value)
                                                }
                                                value={field.value}
                                                required
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
                                                onValueChange={(value) =>
                                                    field.onChange(value)
                                                }
                                                value={field.value}
                                                required
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
                                            <Input
                                                placeholder="Catatan"
                                                {...field}
                                            />
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
                                                type="file"
                                                onChange={(e) => {
                                                    if (e.target.files) {
                                                        field.onChange(
                                                            e.target.files[0]
                                                        );
                                                    }
                                                }}
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

export default Edit;
