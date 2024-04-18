import ActionMessage from "@/components/custom/ActionMessage";
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
import classNames from "classnames";
import { Input } from "@/components/ui/input";
import InputError from "@/components/custom/InputError";

function LogoutOtherBrowserSessionsForm({ sessions }) {
    const [confirmingLogout, setConfirmingLogout] = useState(false);
    const {
        data,
        setData,
        errors,
        processing,
        reset,
        delete: destroy,
        recentlySuccessful,
    } = useForm({
        password: "",
    });

    const confirmLogout = () => {
        setConfirmingLogout(true);
    };

    const logoutOtherBrowserSessions = () => {
        destroy(route("other-browser-sessions.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    function closeModal() {
        setConfirmingLogout(false);
        reset();
    }

    return (
        <ActionSection
            title={"Browser Sessions"}
            description={
                "Manage and log out your active sessions on other browsers and devices."
            }
        >
            <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
                If necessary, you may log out of all of your other browser
                sessions across all of your devices. Some of your recent
                sessions are listed below; however, this list may not be
                exhaustive. If you feel your account has been compromised, you
                should also update your password.
            </div>

            {sessions.length > 0 ? (
                <div className="mt-5 space-y-6">
                    {sessions?.map((session, i) => (
                        <div className="flex items-center" key={i}>
                            <div>
                                {session.agent.is_desktop ? (
                                    <svg
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path
                                            d="M0 0h24v24H0z"
                                            stroke="none"
                                        ></path>
                                        <rect
                                            x="7"
                                            y="4"
                                            width="10"
                                            height="16"
                                            rx="1"
                                        ></rect>
                                        <path d="M11 5h2M12 17v.01"></path>
                                    </svg>
                                )}
                            </div>

                            <div className="ml-3">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {session.agent.platform} -{" "}
                                    {session.agent.browser}
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500">
                                        {session.ip_address},
                                        {session.is_current_device ? (
                                            <span className="text-green-500 font-semibold">
                                                This device
                                            </span>
                                        ) : (
                                            <span>
                                                Last active{" "}
                                                {session.last_active}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}

            <div className="flex items-center mt-5">
                <Button onClick={confirmLogout}>
                    Log Out Other Browser Sessions
                </Button>

                <ActionMessage on={recentlySuccessful} className="ml-3">
                    Done.
                </ActionMessage>
            </div>

            {/* <!-- Log Out Other Devices Confirmation Modal --> */}
            <Dialog open={confirmingLogout} onOpenChange={closeModal}>
                {/* <DialogTrigger>Open</DialogTrigger> */}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Log Out Other Browser Sessions
                        </DialogTitle>
                        <DialogDescription>
                            Please enter your password to confirm you would like
                            to log out of your other browser sessions across all
                            of your devices.
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
                            onClick={logoutOtherBrowserSessions}
                            disabled={processing}
                        >
                            Log Out Other Browser Sessions
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ActionSection>
    );
}

export default LogoutOtherBrowserSessionsForm;
