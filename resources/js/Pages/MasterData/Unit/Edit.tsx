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
    FormDescription,
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
import { Unit } from "./UnitColumns";
import { unitSchema } from "./CreateUnit";

type EditProps = {
    data_unit: Unit;
};

const Edit: React.FC<EditProps> = ({ data_unit }) => {
    const form = useForm<z.infer<typeof unitSchema>>({
        resolver: zodResolver(unitSchema),
        defaultValues: {
            kode_unit: data_unit.kode_unit,
            keterangan: data_unit.keterangan,
        },
    });

    function onSubmit(values: z.infer<typeof unitSchema>) {
        const { kode_unit, keterangan } = values;
        router.patch(
            `/master-data/data-unit/${data_unit.id}`,
            { kode_unit, keterangan },
            {
                onSuccess: () => {
                    toast.success("Unit berhasil diperbarui", {
                        description: "Data unit berhasil disimpan.",
                        action: {
                            label: "Lihat Data",
                            onClick: () => router.visit("/master-data/unit"),
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
            <Head title="Update Unit" />
            <Card>
                <CardHeader>
                    <CardTitle>Update Unit</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="kode_unit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kode Unit</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Kode Unit"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="keterangan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Keterangan</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Keterangan"
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
                                href={route("data-unit.index")}
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
