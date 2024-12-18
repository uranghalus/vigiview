import React from "react";
import { Link } from "@inertiajs/react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "./ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronRight } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface SubItem {
    title: string;
    url: string;
}

interface Item {
    title: string;
    url: string;
    icon?: React.ComponentType;
    items?: SubItem[];
}

interface Group {
    label: string;
    items: Item[];
}

interface SidebarProps {
    groups: Group[];
}

const Menu: React.FC<SidebarProps> = ({ groups }) => {
    const { url } = usePage();

    return (
        <ScrollArea className="h-full w-full ">
            {groups.map((group) => (
                <SidebarGroup key={group.label}>
                    <SidebarGroupLabel className="px-0">
                        {group.label}
                    </SidebarGroupLabel>
                    <SidebarMenu className="space-y-0">
                        {group.items.map((item) => {
                            const isActive = url.startsWith(item.url);

                            return (
                                <SidebarMenuItem key={item.title}>
                                    {item.items ? (
                                        <Collapsible
                                            asChild
                                            defaultOpen={isActive}
                                            className="group/collapsible"
                                        >
                                            <div>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton
                                                        tooltip={item.title}
                                                        className={cn(
                                                            isActive
                                                                ? "bg-blue-500 text-white"
                                                                : "",
                                                            "rounded py-5 px-4"
                                                        )}
                                                    >
                                                        {item.icon && (
                                                            <item.icon />
                                                        )}
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.items.map(
                                                            (subItem) => (
                                                                <SidebarMenuSubItem
                                                                    key={
                                                                        subItem.title
                                                                    }
                                                                >
                                                                    <SidebarMenuSubButton
                                                                        asChild
                                                                        className={
                                                                            url ===
                                                                            subItem.url
                                                                                ? "bg-blue-500 text-white"
                                                                                : ""
                                                                        }
                                                                    >
                                                                        <Link
                                                                            href={
                                                                                subItem.url
                                                                            }
                                                                            className={
                                                                                url ===
                                                                                subItem.url
                                                                                    ? "active"
                                                                                    : ""
                                                                            }
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    subItem.title
                                                                                }
                                                                            </span>
                                                                        </Link>
                                                                    </SidebarMenuSubButton>
                                                                </SidebarMenuSubItem>
                                                            )
                                                        )}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </div>
                                        </Collapsible>
                                    ) : (
                                        <SidebarMenuButton
                                            asChild
                                            className={cn(
                                                isActive
                                                    ? "bg-blue-500 text-white"
                                                    : "",
                                                "rounded py-5 px-4"
                                            )}
                                        >
                                            <Link
                                                href={item.url}
                                                className={
                                                    isActive ? "active" : ""
                                                }
                                            >
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </ScrollArea>
    );
};

export default Menu;
