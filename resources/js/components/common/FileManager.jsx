import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

function FileManager({ id, type, options }) {
    const [filePaths, setFilePaths] = useState("");
    const [previewImages, setPreviewImages] = useState([]);

    const homeUrl = window.location.origin;

    const openFileManager = () => {
        const route_prefix =
            options && options.prefix ? options.prefix : "/laravel-filemanager";
        window.open(
            `${route_prefix}?type=${type}`,
            "FileManager",
            "width=1080,height=600"
        );

        window.SetUrl = (items) => {
            const file_path = items.map((item) => item.url).join(",");
            setFilePaths(file_path);

            const previews = items.map((item) => ({
                thumbUrl: `${homeUrl}${item.thumb_url}`,
            }));
            setPreviewImages(previews); // Update state with previews
        };
    };

    return (
        <div className="max-w-[278px]">
            <input value={filePaths} type="hidden" />
            <Card className="rounded-sm">
                <CardHeader>
                    <CardTitle>Post Thumbnail</CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                        className={`${
                            previewImages.length > 1
                                ? "grid grid-cols-3 gap-2"
                                : ""
                        }`}
                    >
                        {previewImages.map((img, index) => (
                            <div key={index}>
                                <img
                                    src={img.thumbUrl}
                                    className={`border ${
                                        previewImages.length > 1
                                            ? "w-[80px] h-[80px]"
                                            : ""
                                    }`}
                                    alt="Preview"
                                />
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        id={id}
                        onClick={openFileManager}
                        className="w-full"
                    >
                        {filePaths === ""
                            ? "Add Thumbnail"
                            : "Change Thumbnail"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
export default FileManager;
