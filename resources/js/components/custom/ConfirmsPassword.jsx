import React, { useRef, useState } from "react";
import axios from "axios";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import InputError from "./InputError";
import { Button } from "../ui/button";
import classNames from "classnames";

function ConfirmsPassword({
    title = "Confirm Password",
    content = "For your security, please confirm your password to continue.",
    button = "Confirm",
    onConfirm,
    children,
}) {
    const [confirmingPassword, setConfirmingPassword] = useState(false);

    const [form, setForm] = useState({
        password: "",
        error: "",
        processing: false,
    });

    const passwordRef = useRef(null);

    const startConfirmingPassword = () => {
        axios.get(route("password.confirmation")).then((response) => {
            if (response.data.confirmed) {
                onConfirm();
            } else {
                setConfirmingPassword(true);

                setTimeout(() => passwordRef.current?.focus(), 250);
            }
        });
    };

    const confirmPassword = () => {
        setForm({ ...form, processing: true });

        axios
            .post(route("password.confirm"), {
                password: form.password,
            })
            .then(() => {
                closeModal();
                setTimeout(() => onConfirm(), 250);
            })
            .catch((error) => {
                setForm({
                    ...form,
                    processing: false,
                    error: error.response.data.errors.password[0],
                });
                passwordRef.current?.focus();
            });
    };

    const closeModal = () => {
        setConfirmingPassword(false);
        setForm({ processing: false, password: "", error: "" });
    };

    return (
        <span>
            <span onClick={startConfirmingPassword}>{children}</span>
            <Dialog open={confirmingPassword} onOpenChange={closeModal}>
                {/* <DialogTrigger>Open</DialogTrigger> */}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {content}
                            <div className="mt-4">
                                <Input
                                    ref={passwordRef}
                                    type="password"
                                    className="mt-1 block "
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            password: e.currentTarget.value,
                                        })
                                    }
                                />

                                <InputError
                                    message={form.error}
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
                                "opacity-25": form.processing,
                            })}
                            onClick={confirmPassword}
                            disabled={form.processing}
                        >
                            {button}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </span>
    );
}

export default ConfirmsPassword;
