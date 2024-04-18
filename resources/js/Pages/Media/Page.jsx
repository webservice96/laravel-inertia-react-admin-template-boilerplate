import AppLayout from "@/components/custom/appLayout";
import React from "react";

function MediaPage() {
    return (
        <AppLayout pageTitle={"Media Files"}>
            <iframe
                src="/laravel-filemanager?type=image"
                className="h-[calc(100vh-101px)] w-full overflow-hidden border"
            ></iframe>
        </AppLayout>
    );
}

export default MediaPage;
