import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Save } from "lucide-react";
const jabatanSchema = z.object({
    id: z.number().optional(), // Optional
    kode: z
        .string()
        .min(2, "Kode minimal 2 karakter")
        .max(50, "Kode maksimal 50 karakter"),
    keterangan: z
        .string()
        .min(2, "Keterangan minimal 2 karakter")
        .max(50, "Keterangan maksimal 50 karakter"),
    created_date: z.string().optional(), // Optional
    created: z.string().optional(), // Optional
    modified_date: z.string().nullable().optional(),
    modified: z.string().nullable().optional(),
});
const create = () => {
    const form = useForm<z.infer<typeof jabatanSchema>>({
        resolver: zodResolver(jabatanSchema),
        defaultValues: {
            kode: "",
            keterangan: "",
        },
    });
    function onSubmit(values: z.infer<typeof jabatanSchema>) {
        console.log("Data", values);
        const { kode, keterangan } = values;
        const url = "/master-kejadian/jabatan";
        router.visit(url, {
            method: "post",
            data: { kode, keterangan },
            onSuccess: () => {
                // Optionally trigger a page reload or state update after success
            },
            preserveScroll: true,
        });
    }
    return (
        <AuthenticatedLayout header={null}>
            <Head title="Data Jabatan" />
            <h1 className="text-2xl font-bold mb-4">Master Jabatan</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Tambah Jabatan</CardTitle>
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
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
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
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex items-center justify-between">
                            <Link
                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
                                href={route("jabatan.index")}
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

export default create;
