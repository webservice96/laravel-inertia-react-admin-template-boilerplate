import FileManager from "@/components/common/FileManager";
import AppLayout from "@/components/custom/appLayout";
import React from "react";

function UploadDemo() {
    return (
        <AppLayout pageTitle={"Media Upload Demo"}>
            <FileManager
                id="lfm1"
                type="image"
                options={{ prefix: "/filemanager" }}
            />
        </AppLayout>
    );
}

export default UploadDemo;
