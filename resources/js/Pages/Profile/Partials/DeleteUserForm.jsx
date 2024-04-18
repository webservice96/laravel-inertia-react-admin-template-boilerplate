import ActionSection from "@/components/custom/ActionSection";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import InputError from "@/components/custom/InputError";
import classNames from "classnames";

function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const {
        delete: destroy,
        data,
        processing,
        setData,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = () => {
        destroy(route("current-user.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <ActionSection
            title={"Delete Account"}
            description={"Permanently delete your account."}
        >
            <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
                Once your account is deleted, all of its resources and data will
                be permanently deleted. Before deleting your account, please
                download any data or information that you wish to retain.
            </div>

            <div className="mt-5">
                <Button variant="destructive" onClick={confirmUserDeletion}>
                    Delete Account
                </Button>
            </div>

            {/* <!-- Delete Account Confirmation Modal --> */}
            <Dialog open={confirmingUserDeletion} onOpenChange={closeModal}>
                {/* <DialogTrigger>Open</DialogTrigger> */}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Account</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete your account? Once
                            your account is deleted, all of its resources and
                            data will be permanently deleted. Please enter your
                            password to confirm you would like to permanently
                            delete your account.
                            <div className="mt-4">
                                <Input
                                    type="password"
                                    className="mt-1 block "
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData(
                                            "password",
                                            e.currentTarget.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="sm:justify-start">
                        <Button
                            type="button"
                            variant="secondary"
                            className={classNames("ml-2", {
                                "opacity-25": processing,
                            })}
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            className={classNames("ml-2", {
                                "opacity-25": processing,
                            })}
                            onClick={deleteUser}
                            disabled={processing}
                        >
                            Delete Account
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ActionSection>
    );
}

export default DeleteUserForm;
