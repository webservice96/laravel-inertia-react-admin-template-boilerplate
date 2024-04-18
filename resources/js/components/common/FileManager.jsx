import React, { useRef } from "react";

function FileManager({ id, type, options }) {
    const inputRef = useRef(null);
    const previewRef = useRef(null);

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
            inputRef.current.value = file_path;
        };
    };

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                style={{ visibility: "hidden" }}
            />
            <div ref={previewRef}></div>
            <button id={id} onClick={openFileManager}>
                Open File Manager
            </button>
        </div>
    );
}
export default FileManager;
