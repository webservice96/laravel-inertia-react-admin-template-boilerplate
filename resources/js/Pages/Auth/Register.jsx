import InputError from "@/components/custom/InputError";
import PasswordInput from "@/components/custom/password-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Head, Link, useForm } from "@inertiajs/react";

function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <>
            <Head title="Register - Glopsy" />

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
                                Create an account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email and password to create an
                                account. <br />
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                        {/* login form start */}
                        <div className={"grid gap-2"}>
                            <form onSubmit={submit}>
                                <div className="grid gap-2">
                                    <div className="space-y-1">
                                        <Label>Name</Label>
                                        <Input
                                            placeholder="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <InputError message={errors.name} />
                                    </div>

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
                                        <InputError message={errors.email} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Password</Label>
                                        <PasswordInput
                                            placeholder="********"
                                            name="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError message={errors.password} />
                                        {/* <FormMessage /> */}
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Confirm Password</Label>
                                        <PasswordInput
                                            placeholder="********"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <Button
                                        className="mt-2"
                                        disabled={processing}
                                    >
                                        Sing up
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Register;
