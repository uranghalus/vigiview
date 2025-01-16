import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { jabatanSchema } from "./create";
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
import { Jabatan } from "./Column";
type EditProps = {
    jabatan: Jabatan;
};
const Edit: React.FC<EditProps> = ({ jabatan }) => {
    const form = useForm<z.infer<typeof jabatanSchema>>({
        resolver: zodResolver(jabatanSchema),
        defaultValues: {
            kode: jabatan.kode,
            keterangan: jabatan.keterangan,
        },
    });

    function onSubmit(values: z.infer<typeof jabatanSchema>) {
        const { kode, keterangan } = values;
        router.patch(
            `/master-kejadian/jabatan/${jabatan.id}`, // Fix the URL to use jabatan.id
            { kode, keterangan },
            {
                onSuccess: () => {
                    toast.success("Jabatan berhasil ditambahkan", {
                        description: "Data jabatan berhasil disimpan.",
                        action: {
                            label: "Lihat Data",
                            onClick: () =>
                                router.visit("/master-kejadian/jabatan"),
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
            <Head title="Update Jabatan" />
            <Card>
                <CardHeader>
                    <CardTitle>Update Jabatan</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="kode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jabatan</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Kode Jabatan"
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
                                href={route("jabatan.index")}
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
