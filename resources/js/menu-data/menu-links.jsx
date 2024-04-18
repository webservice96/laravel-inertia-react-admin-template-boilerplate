import {
    IconDashboard,
    IconFiles,
    IconHexagonNumber1,
    IconHexagonNumber2,
    IconUpload,
    IconUserShield,
    IconUsers,
} from "@tabler/icons-react";

export const menulinks = [
    {
        title: "Dashboard",
        label: "",
        href: "dashboard", // route name
        url: "/dashboard", // route url
        icon: <IconDashboard size={18} />,
    },
    {
        title: "Media",
        label: "",
        href: "mediafiles", // route name
        url: "/media", // route url
        icon: <IconFiles size={18} />,
    },
    {
        title: "Upload",
        label: "",
        href: "upload.demo", // route name
        url: "/upload-demo", // route url
        icon: <IconUpload size={18} />,
    },
    {
        title: "Posts",
        label: "",
        href: "",
        icon: <IconUserShield size={18} />,
        sub: [
            {
                title: "All Posts",
                label: "",
                href: "dashboard", // route name
                url: "/posts", // route url
                icon: <IconHexagonNumber1 size={18} />,
            },
            {
                title: "Add new",
                label: "",
                href: "dashboard",
                url: "/post-add-new",
                icon: <IconHexagonNumber2 size={18} />,
            },
            {
                title: "Category",
                label: "",
                href: "dashboard",
                url: "/post-category",
                icon: <IconHexagonNumber2 size={18} />,
            },
        ],
    },
    {
        title: "Users",
        label: "",
        href: "dashboard",
        icon: <IconUsers size={18} />,
    },
];
