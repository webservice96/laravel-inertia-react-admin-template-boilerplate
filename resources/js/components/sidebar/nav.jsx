import React from "react";
import { IconChevronDown } from "@tabler/icons-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Link, usePage } from "@inertiajs/react";
import { ScrollArea } from "@/components/ui/scroll-area";

function Nav({ links, isCollapsed, className, closeNav }) {
    const renderLink = ({ sub, ...rest }) => {
        const key = `${rest.title}-${rest.href}`;
        if (isCollapsed && sub)
            return (
                <NavLinkIconDropdown
                    {...rest}
                    sub={sub}
                    key={key}
                    closeNav={closeNav}
                />
            );

        if (isCollapsed)
            return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />;

        if (sub)
            return (
                <NavLinkDropdown
                    {...rest}
                    sub={sub}
                    key={key}
                    closeNav={closeNav}
                />
            );

        return <NavLink {...rest} key={key} closeNav={closeNav} />;
    };

    return (
        <ScrollArea>
            <div
                data-collapsed={isCollapsed}
                className={cn(
                    "group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none",
                    className
                )}
            >
                <TooltipProvider delayDuration={0}>
                    <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                        {links.map(renderLink)}
                    </nav>
                </TooltipProvider>
            </div>
        </ScrollArea>
    );
}

function NavLink({ title, icon, label, href, url, closeNav, subLink = false }) {
    const { url: currentUrl } = usePage();
    return (
        <Link
            href={route(href)}
            onClick={closeNav}
            className={cn(
                buttonVariants({
                    variant: currentUrl === url ? "secondary" : "ghost",
                    size: "sm",
                }),
                "h-12 justify-start text-wrap rounded-none px-6",
                subLink && "h-10 w-full border-l border-l-slate-500 px-2"
            )}
        >
            <div className="mr-2">{icon}</div>
            {title}
            {label && (
                <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
                    {label}
                </div>
            )}
        </Link>
    );
}

function NavLinkDropdown({ title, icon, label, sub, closeNav }) {
    const { url: currentUrl } = usePage();

    const isChildActive = !!sub?.find((s) => s.url === currentUrl);

    return (
        <Collapsible defaultOpen={isChildActive}>
            <CollapsibleTrigger
                className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "group h-12 w-full justify-start rounded-none px-6"
                )}
            >
                <div className="mr-2">{icon}</div>
                {title}
                {label && (
                    <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
                        {label}
                    </div>
                )}
                <span
                    className={cn(
                        'ml-auto transition-all group-data-[state="open"]:-rotate-180'
                    )}
                >
                    <IconChevronDown stroke={1} />
                </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="collapsibleDropdown" asChild>
                <ul>
                    {sub?.map((sublink) => (
                        <li key={sublink.title} className="my-1 ml-8">
                            <NavLink {...sublink} subLink closeNav={closeNav} />
                        </li>
                    ))}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    );
}

function NavLinkIcon({ title, icon, label, href, url }) {
    const { url: currentUrl } = usePage();
    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Link
                    href={route(href)}
                    className={cn(
                        buttonVariants({
                            variant: currentUrl === url ? "secondary" : "ghost",
                            size: "icon",
                        }),
                        "h-12 w-12"
                    )}
                >
                    {icon}
                    <span className="sr-only">{title}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
                {title}
                {label && (
                    <span className="ml-auto text-muted-foreground">
                        {label}
                    </span>
                )}
            </TooltipContent>
        </Tooltip>
    );
}

function NavLinkIconDropdown({ title, icon, label, sub, url }) {
    const { url: currentUrl } = usePage();
    return (
        <DropdownMenu>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={currentUrl === url ? "secondary" : "ghost"}
                            size="icon"
                            className="h-12 w-12"
                        >
                            {icon}
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                >
                    {title}{" "}
                    {label && (
                        <span className="ml-auto text-muted-foreground">
                            {label}
                        </span>
                    )}
                    <IconChevronDown
                        size={18}
                        className="-rotate-90 text-muted-foreground"
                    />
                </TooltipContent>
            </Tooltip>
            <DropdownMenuContent side="right" align="start" sideOffset={4}>
                <DropdownMenuLabel>
                    {title} {label ? `(${label})` : ""}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sub?.map(({ title, icon, label, href, url }) => (
                    <DropdownMenuItem key={`${title}-${href}`} asChild>
                        <Link
                            href={route(href)}
                            className={`${
                                currentUrl === url ? "bg-secondary" : ""
                            }`}
                        >
                            {icon}{" "}
                            <span className="ml-2 max-w-52">{title}</span>
                            {label && (
                                <span className="ml-auto text-xs">{label}</span>
                            )}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Nav;
