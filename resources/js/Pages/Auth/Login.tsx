import Alert from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
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
                {status && (
                    <Alert type="success" message={status} className="mb-4" />
                )}

                {Object.keys(errors).length > 0 && (
                    <Alert
                        type="error"
                        message="There were some problems with your submission."
                        className="mb-4"
                    />
                )}
                <form onSubmit={submit} className="grid gap-4 mt-5">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
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
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center">
                            <Checkbox
                                checked={data.remember}
                                onCheckedChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-3 block text-sm text-gray-800"
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-blue-600 hover:underline font-semibold"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="!mt-8">
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
