import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import os from "os";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function getInitials(name: string): string {
    if (!name) return "";

    const words = name.trim().split(" ");
    const initials = words.map((word) => word[0].toUpperCase()).join("");

    return initials;
}
export function getDeviceInfo() {
    const interfaces = os.networkInterfaces();
    const macAddresses: string[] = [];

    Object.values(interfaces).forEach((networkInterface) => {
        networkInterface?.forEach((detail) => {
            if (!detail.internal) {
                macAddresses.push(detail.mac);
            }
        });
    });

    return macAddresses;
}
export function parseDate(date: string) {
    const dateObject = new Date(date);
    return dateObject
        .toLocaleString("id-ID", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
        .replace(",", "");
}
