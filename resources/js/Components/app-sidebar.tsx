import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar";
import Logo from "./logo";
import Menu from "./menu";
import { usePage } from "@inertiajs/react";
import UserProfile from "./user-profile";
import { items } from "@/data/menu-data";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = usePage().props.auth.user;
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <a href="#">
                                <div className="flex aspect-square">
                                    <Logo className="size-10" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        VigiView
                                    </span>
                                    <span className="truncate text-xs">
                                        v.1.0.0
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <Menu groups={items} />
            </SidebarContent>
            <SidebarFooter>
                <UserProfile user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
