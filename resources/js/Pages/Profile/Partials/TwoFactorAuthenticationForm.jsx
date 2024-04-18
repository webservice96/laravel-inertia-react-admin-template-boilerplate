import ActionSection from "@/components/custom/ActionSection";
import ConfirmsPassword from "@/components/custom/ConfirmsPassword";
import InputError from "@/components/custom/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { router, useForm, usePage } from "@inertiajs/react";
import classNames from "classnames";
import React, { useState } from "react";

function TwoFactorAuthenticationForm({ requiresConfirmation }) {
    const { auth } = usePage().props;

    const [enabling, setEnabling] = useState(false);
    const [disabling, setDisabling] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [qrCode, setQrCode] = useState(null);
    const [recoveryCodes, setRecoveryCodes] = useState([]);
    const [setupKey, setSetupKey] = useState(null);
    const confirmationForm = useForm({
        code: "",
    });

    const twoFactorEnabled = auth?.user?.two_factor_enabled;

    const enableTwoFactorAuthentication = () => {
        setEnabling(true);

        router.post(
            "/user/two-factor-authentication",
            {},
            {
                preserveScroll: true,
                onSuccess() {
                    return Promise.all([
                        showQrCode(),
                        showSetupKey(),
                        showRecoveryCodes(),
                    ]);
                },
                onFinish() {
                    setEnabling(false);
                    setConfirming(requiresConfirmation);
                },
            }
        );
    };

    const showSetupKey = () => {
        return axios.get("/user/two-factor-secret-key").then((response) => {
            setSetupKey(response.data.secretKey);
        });
    };

    const confirmTwoFactorAuthentication = () => {
        confirmationForm.post("/user/confirmed-two-factor-authentication", {
            preserveScroll: true,
            preserveState: true,
            errorBag: "confirmTwoFactorAuthentication",
            onSuccess: () => {
                setConfirming(false);
                setQrCode(null);
                setSetupKey(null);
            },
        });
    };

    const showQrCode = () => {
        return axios.get("/user/two-factor-qr-code").then((response) => {
            setQrCode(response.data.svg);
        });
    };

    const showRecoveryCodes = () => {
        return axios.get("/user/two-factor-recovery-codes").then((response) => {
            setRecoveryCodes(response.data);
        });
    };

    const regenerateRecoveryCodes = () => {
        axios.post("/user/two-factor-recovery-codes").then(() => {
            showRecoveryCodes();
        });
    };

    const disableTwoFactorAuthentication = () => {
        setDisabling(true);

        router.delete("/user/two-factor-authentication", {
            preserveScroll: true,
            onSuccess() {
                setDisabling(false);
                setConfirming(false);
            },
        });
    };

    return (
        <ActionSection
            title={"Two Factor Authentication"}
            description={
                "Add additional security to your account using two factor authentication."
            }
        >
            {(() => {
                if (twoFactorEnabled && !confirming) {
                    return (
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            You have enabled two factor authentication.
                        </h3>
                    );
                }
                if (confirming) {
                    return (
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Finish enabling two factor authentication.
                        </h3>
                    );
                }
                return (
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        You have not enabled two factor authentication.
                    </h3>
                );
            })()}

            <div className="mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                <p>
                    When two factor authentication is enabled, you will be
                    prompted for a secure, random token during authentication.
                    You may retrieve this token from your phone's Google
                    Authenticator application.
                </p>
            </div>

            {twoFactorEnabled || confirming ? (
                <div>
                    {qrCode ? (
                        <div>
                            <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                                {confirming ? (
                                    <p className="font-semibold">
                                        To finish enabling two factor
                                        authentication, scan the following QR
                                        code using your phone's authenticator
                                        application or enter the setup key and
                                        provide the generated OTP code.
                                    </p>
                                ) : (
                                    <p>
                                        Two factor authentication is now
                                        enabled. Scan the following QR code
                                        using your phone's authenticator
                                        application or enter the setup key.
                                    </p>
                                )}
                            </div>

                            <div
                                className="mt-4"
                                dangerouslySetInnerHTML={{
                                    __html: qrCode || "",
                                }}
                            />

                            {setupKey && (
                                <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                                    <p className="font-semibold">
                                        Setup Key:{" "}
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: setupKey || "",
                                            }}
                                        />
                                    </p>
                                </div>
                            )}

                            {confirming && (
                                <div className="mt-4">
                                    <Label htmlFor="code">Code</Label>

                                    <Input
                                        id="code"
                                        type="text"
                                        name="code"
                                        className="block mt-1 w-1/2"
                                        inputMode="numeric"
                                        autoFocus={true}
                                        autoComplete="one-time-code"
                                        value={confirmationForm.data.code}
                                        onChange={(e) =>
                                            confirmationForm.setData(
                                                "code",
                                                e.currentTarget.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={confirmationForm.errors.code}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                        </div>
                    ) : null}

                    {recoveryCodes.length > 0 && !confirming ? (
                        <div>
                            <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                                <p className="font-semibold">
                                    Store these recovery codes in a secure
                                    password manager. They can be used to
                                    recover access to your account if your two
                                    factor authentication device is lost.
                                </p>
                            </div>

                            <div className="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 dark:bg-gray-900 rounded-lg">
                                {recoveryCodes.map((code) => (
                                    <div key={code}>{code}</div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : null}

            <div className="mt-5">
                {twoFactorEnabled || confirming ? (
                    <div>
                        {confirming ? (
                            <ConfirmsPassword
                                onConfirm={confirmTwoFactorAuthentication}
                            >
                                <Button
                                    className={classNames("mr-3", {
                                        "opacity-25": enabling,
                                    })}
                                    disabled={enabling}
                                >
                                    Confirm
                                </Button>
                            </ConfirmsPassword>
                        ) : null}
                        {recoveryCodes.length > 0 && !confirming ? (
                            <ConfirmsPassword
                                onConfirm={regenerateRecoveryCodes}
                            >
                                <Button className="mr-3" variant="secondary">
                                    Regenerate Recovery Codes
                                </Button>
                            </ConfirmsPassword>
                        ) : null}
                        {recoveryCodes.length === 0 && !confirming ? (
                            <ConfirmsPassword onConfirm={showRecoveryCodes}>
                                <Button className="mr-3" variant="secondary">
                                    Show Recovery Codes
                                </Button>
                            </ConfirmsPassword>
                        ) : null}

                        {confirming ? (
                            <ConfirmsPassword
                                onConfirm={disableTwoFactorAuthentication}
                            >
                                <Button
                                    className={classNames("mr-3", {
                                        "opacity-25": disabling,
                                    })}
                                    variant="secondary"
                                    disabled={disabling}
                                >
                                    Cancel
                                </Button>
                            </ConfirmsPassword>
                        ) : (
                            <ConfirmsPassword
                                onConfirm={disableTwoFactorAuthentication}
                            >
                                <Button
                                    className={classNames({
                                        "opacity-25": disabling,
                                    })}
                                    variant="destructive"
                                    disabled={disabling}
                                >
                                    Disable
                                </Button>
                            </ConfirmsPassword>
                        )}
                    </div>
                ) : (
                    <div>
                        <ConfirmsPassword
                            onConfirm={enableTwoFactorAuthentication}
                        >
                            <Button
                                type="button"
                                className={classNames({
                                    "opacity-25": enabling,
                                })}
                                disabled={enabling}
                            >
                                Enable
                            </Button>
                        </ConfirmsPassword>
                    </div>
                )}
            </div>
        </ActionSection>
    );
}

export default TwoFactorAuthenticationForm;
