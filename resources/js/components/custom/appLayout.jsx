import { useState } from "react";
import Sidebar from "../sidebar/sidebar";
import ThemeSwitch from "../theme-switch";
import { UserNav } from "../common/user-nav";

export default function AppLayout({ children, pageTitle }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div className="relative h-full --overflow-hidden bg-background">
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            <header
                className={`flex h-[53px] items-center gap-1 border-b bg-background px-4 py-6 md:px-7 mt-[57px] md:mt-0 ${
                    isCollapsed ? "md:ml-14" : "md:ml-64"
                }`}
            >
                <h1 className="text-xl font-semibold">{pageTitle}</h1>
                <div className="ml-auto gap-2 flex items-center">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </header>

            <main
                id="content"
                className={`overflow-x-hidden transition-[margin] md:overflow-y-hidden ${
                    isCollapsed ? "md:ml-14" : "md:ml-64"
                } h-full`}
            >
                <div className="flex-1 overflow-hidden px-4 py-6 md:px-7 h-[calc(100%-var(--header-height))] flex flex-col">
                    {children}
                </div>
            </main>
        </div>
    );
}
