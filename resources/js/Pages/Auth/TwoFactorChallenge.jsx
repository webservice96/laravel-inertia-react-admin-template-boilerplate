import InputError from "@/components/custom/InputError";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

function TwoFactorChallenge() {
    const [recovery, setRecovery] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        code: "",
        recovery_code: "",
    });

    function toggleRecovery() {
        const isRecovery = !recovery;
        setRecovery(isRecovery);

        setTimeout(() => {
            if (isRecovery) {
                setData("code", "");
            } else {
                setData("recovery_code", "");
            }
        }, 100);
    }

    const submit = (e) => {
        e.preventDefault();

        post(route("two-factor.login"));
    };

    return (
        <>
            <Head title="Two Factor Challenge" />
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
                                Two Factor Challenge
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {recovery
                                    ? "Please confirm access to your account by entering one of your emergency recovery codes."
                                    : "Please confirm access to your account by entering the authentication code provided by your authenticator application."}
                            </p>
                        </div>
                        {/* login form start */}
                        <div className={"grid gap-2"}>
                            <form onSubmit={submit}>
                                <div className="grid gap-2">
                                    {recovery ? (
                                        <div className="space-y-1">
                                            <Label>Recovery Code</Label>
                                            <Input
                                                placeholder=""
                                                type="text"
                                                name="recovery_code"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "recovery_code",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.recovery_code}
                                            />
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            <Label>Code</Label>
                                            <Input
                                                placeholder="015697"
                                                type="number"
                                                name="code"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "code",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <InputError message={errors.code} />
                                        </div>
                                    )}

                                    <Button
                                        className="mt-2"
                                        disabled={processing}
                                    >
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </div>
                        {/* login form end */}
                        {/* <p className="mt-4 px-8 text-center text-sm text-muted-foreground">

                        </p> */}
                        <div className="mt-1 text-end">
                            <button
                                type="button"
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 underline cursor-pointer"
                                onClick={toggleRecovery}
                            >
                                {recovery
                                    ? "Use an authentication code"
                                    : "Use a recovery code"}
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default TwoFactorChallenge;
