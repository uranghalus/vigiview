import { Link } from "@inertiajs/react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export function LoginForm() {
    return (
        <div className="mx-auto max-w-md">
            <span className="text-2xl mx-auto font-bold">Login</span>
            <div className="grid gap-4 mt-5">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href={""}
                            className="ml-auto inline-block text-sm underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                Belum Punya Akun?{" "}
                <Link href={route("register")} className="underline">
                    Daftar Sekarang
                </Link>
            </div>
        </div>
    );
}
