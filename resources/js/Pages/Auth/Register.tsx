import Alert from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

import { Label } from "@/Components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mx-auto max-w-md">
                <div className="mb-8">
                    <h3 className="text-gray-800 text-3xl font-extrabold">
                        Sign in
                    </h3>
                    <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                        Sign in to your account and explore a world of
                        possibilities. Your journey begins here.
                    </p>
                </div>

                {Object.keys(errors).length > 0 && (
                    <Alert
                        type="error"
                        message="There were some problems with your submission."
                        className="mb-4"
                    />
                )}
                <form onSubmit={submit} className="grid gap-4 mt-5">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Name</Label>
                        <Input
                            id="email"
                            type="text"
                            name=""
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password Confirmation</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />
                    </div>
                    <div className="!mt-2">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            Login
                        </Button>
                    </div>
                </form>
                <p className="text-sm !mt-8 text-center text-gray-800">
                    Don't have an account{" "}
                    <Link
                        href={route("register")}
                        className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
