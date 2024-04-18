import InputError from "@/components/custom/InputError";
import PasswordInput from "@/components/custom/password-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Head, Link, useForm } from "@inertiajs/react";

function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <Head title="Login - Glopsy" />
            <div className="container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
                    <div className="mb-4 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        <h1 className="text-xl font-medium">Glopsy Admin</h1>
                    </div>
                    <Card className="p-6">
                        <div className="flex flex-col space-y-2 text-left">
                            {status && (
                                <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                                    {status}
                                </div>
                            )}
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email and password below <br />
                                to log into your account
                            </p>
                        </div>
                        {/* login form start */}
                        <div className={"grid gap-2"}>
                            <form onSubmit={submit}>
                                <div className="grid gap-2">
                                    <div className="space-y-1">
                                        <Label>Email</Label>
                                        <Input
                                            placeholder="name@example.com"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label>Password</Label>
                                            <Link
                                                href={route("password.request")}
                                                className="text-sm font-medium text-muted-foreground hover:opacity-75"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>

                                        <PasswordInput
                                            placeholder="********"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <Button
                                        className="mt-2"
                                        disabled={processing}
                                    >
                                        Login
                                    </Button>
                                </div>
                            </form>

                            <div className="relative my-2">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Don't have an account?
                                    </span>
                                </div>
                            </div>

                            <div>
                                <Button className="w-full">
                                    <Link href="/register">Sing up</Link>
                                </Button>
                            </div>
                        </div>
                        {/* login form end */}
                        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
                            If you don't have an account please don't try to
                            login.
                        </p>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Login;
