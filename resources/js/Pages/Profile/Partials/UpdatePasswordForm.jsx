import ActionMessage from "@/components/custom/ActionMessage";
import FormSection from "@/components/custom/FormSection";
import InputError from "@/components/custom/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import classNames from "classnames";
import React, { useRef } from "react";

function UpdatePasswordForm() {
    const {
        data,
        setData,
        errors,
        put,
        reset,
        recentlySuccessful,
        processing,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const passwordRef = useRef(null);
    const currentPasswordRef = useRef(null);

    function updatePassword() {
        put(route("user-password.update"), {
            errorBag: "updatePassword",
            preserveScroll: true,
            onSuccess: () => reset(),
            // onError: () => {
            //     if (errors.password) {
            //         reset("password", "password_confirmation");
            //         passwordRef.current?.focus();
            //     }

            //     if (errors.current_password) {
            //         reset("current_password");
            //         currentPasswordRef.current?.focus();
            //     }
            // },
        });
    }

    return (
        <FormSection
            onSubmit={updatePassword}
            title={"Update Password"}
            description={
                "Ensure your account is using a long, random password to stay secure."
            }
            renderActions={() => (
                <>
                    <ActionMessage on={recentlySuccessful} className="mr-3">
                        Saved.
                    </ActionMessage>

                    <Button
                        className={classNames({
                            "opacity-25": processing,
                        })}
                        disabled={processing}
                    >
                        Save
                    </Button>
                </>
            )}
        >
            <div className="col-span-6 sm:col-span-12">
                <Label htmlFor="current_password">Current Password</Label>
                <Input
                    id="current_password"
                    type="password"
                    className="mt-1 block w-full"
                    ref={currentPasswordRef}
                    value={data.current_password}
                    onChange={(e) =>
                        setData("current_password", e.currentTarget.value)
                    }
                    autoComplete="current-password"
                />
                <InputError
                    message={errors.current_password}
                    className="mt-2"
                />
            </div>

            <div className="col-span-6 sm:col-span-12">
                <Label htmlFor="password">New Password</Label>
                <Input
                    id="password"
                    type="password"
                    className="mt-1 block w-full"
                    value={data.password}
                    onChange={(e) => setData("password", e.currentTarget.value)}
                    autoComplete="new-password"
                    ref={passwordRef}
                />
                <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="col-span-6 sm:col-span-12">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input
                    id="password_confirmation"
                    type="password"
                    className="mt-1 block w-full"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.currentTarget.value)
                    }
                    autoComplete="new-password"
                />
                <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                />
            </div>
        </FormSection>
    );
}

export default UpdatePasswordForm;
