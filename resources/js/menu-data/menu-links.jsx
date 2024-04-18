import { IconDashboard, IconFiles, IconUpload } from "@tabler/icons-react";

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
    // {
    //     title: "Posts",
    //     label: "",
    //     href: "",
    //     icon: <IconUserShield size={18} />,
    //     sub: [
    //         {
    //             title: "All Posts",
    //             label: "",
    //             href: "post.list", // route name
    //             url: "/posts", // route url
    //             icon: <IconHexagonNumber1 size={18} />,
    //         },
    //         {
    //             title: "Add new",
    //             label: "",
    //             href: "post.addnew",
    //             url: "/post-add-new",
    //             icon: <IconHexagonNumber2 size={18} />,
    //         },
    //         {
    //             title: "Category",
    //             label: "",
    //             href: "post.category",
    //             url: "/post-category",
    //             icon: <IconHexagonNumber2 size={18} />,
    //         },
    //     ],
    // },
    // {
    //     title: "Users",
    //     label: "",
    //     href: "/users",
    //     icon: <IconUsers size={18} />,
    // },
];
