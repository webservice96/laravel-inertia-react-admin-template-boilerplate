import SectionBorder from "@/components/custom/SectionBorder";
import AppLayout from "@/components/custom/appLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import TwoFactorAuthenticationForm from "./Partials/TwoFactorAuthenticationForm";
import LogoutOtherBrowserSessionsForm from "./Partials/LogoutOtherBrowserSessionsForm";
import DeleteUserForm from "./Partials/DeleteUserForm";

function Show({ jetstream, sessions, auth, confirmsTwoFactorAuthentication }) {
    return (
        <>
            <AppLayout pageTitle={"Profile"}>
                <Head title="Profile" />

                <div>
                    {jetstream.canUpdateProfileInformation ? (
                        <div>
                            <UpdateProfileInformationForm
                                jetstream={jetstream}
                                user={auth.user}
                            />
                            <SectionBorder />
                        </div>
                    ) : null}

                    {/* password update */}
                    {jetstream.canUpdatePassword ? (
                        <div className="mt-10 sm:mt-0">
                            <UpdatePasswordForm />
                            <SectionBorder />
                        </div>
                    ) : null}

                    {jetstream.canManageTwoFactorAuthentication ? (
                        <div className="mt-10 sm:mt-0">
                            <TwoFactorAuthenticationForm
                                requiresConfirmation={
                                    confirmsTwoFactorAuthentication
                                }
                            />
                            <SectionBorder />
                        </div>
                    ) : null}

                    <div className="mt-10 sm:mt-0">
                        <LogoutOtherBrowserSessionsForm sessions={sessions} />
                    </div>

                    {jetstream.hasAccountDeletionFeatures ? (
                        <>
                            <SectionBorder />
                            <div className="mt-10 sm:mt-0">
                                <DeleteUserForm />
                            </div>
                        </>
                    ) : null}
                </div>
            </AppLayout>
        </>
    );
}

export default Show;
