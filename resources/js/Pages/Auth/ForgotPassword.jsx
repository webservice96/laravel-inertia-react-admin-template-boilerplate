import InputError from "@/components/custom/InputError";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };
    return (
        <>
            <Head title="Forgot Password" />
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
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Forgot Password
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your registered email and <br />
                                we will send you a link to reset your password.
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
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        {status && (
                                            <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                                                {status}
                                            </div>
                                        )}
                                        <InputError message={errors.email} />
                                    </div>
                                    <Button
                                        className="mt-2"
                                        disabled={processing}
                                    >
                                        Email Password Reset Link
                                    </Button>
                                </div>
                            </form>
                        </div>
                        {/* login form end */}
                        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link
                                href="/register"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Sign up
                            </Link>
                        </p>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
