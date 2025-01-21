import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";

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
import { Instansi } from "./InstansiColumn";
import { instansiSchema } from "./Create";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Unit } from "../Unit/UnitColumns";

type EditProps = {
    data_instansi: Instansi;
    unit_data: Unit[];
};

const Edit: React.FC<EditProps> = ({ data_instansi, unit_data }) => {
    const form = useForm<z.infer<typeof instansiSchema>>({
        resolver: zodResolver(instansiSchema),
        defaultValues: {
            kode_instansi: data_instansi.kode_instansi,
            keterangan_instansi: data_instansi.keterangan_instansi,
            lokasi: data_instansi.lokasi,
            area: data_instansi.area,
            unit_id: data_instansi.unit_id.toString(),
        },
    });

    function onSubmit(values: z.infer<typeof instansiSchema>) {
        const { kode_instansi, keterangan_instansi, lokasi, area, unit_id } =
            values;
        router.patch(
            `/master-data/data-instansi/${data_instansi.id}`,
            { kode_instansi, keterangan_instansi, lokasi, area, unit_id },
            {
                onSuccess: () => {
                    toast.success("Instansi berhasil diperbarui", {
                        description: "Data instansi berhasil disimpan.",
                        action: {
                            label: "Lihat Data",
                            onClick: () =>
                                router.visit("/master-data/instansi"),
                        },
                    });
                },
                onError: (errors) => {
                    Object.values(errors).forEach((error) => {
                        toast.error(error);
                    });
                },
                preserveScroll: true,
            }
        );
    }

    return (
        <AuthenticatedLayout header={null}>
            <Head title="Update Instansi" />
            <Card>
                <CardHeader>
                    <CardTitle>Update Instansi</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="unit_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kode Unit</FormLabel>
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
                                                {unit_data.map((unit) => (
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
                                name="kode_instansi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kode Instansi</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Kode Instansi"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="keterangan_instansi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Keterangan Instansi
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Keterangan Instansi"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lokasi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lokasi</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Lokasi"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="area"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Area</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Area"
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
                                href={route("data-instansi.index")}
                            >
                                Kembali
                            </Link>
                            <Button type="submit">
                                <Save className="size-6" /> Update Data
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Edit;
