import AppLayout from "@/components/custom/appLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

function Dashboard() {
    return (
        <>
            <AppLayout pageTitle={"Dashboard"}>
                <Head title="Dashboard" />
            </AppLayout>
        </>
    );
}

export default Dashboard;
