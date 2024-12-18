// import RevenueCard from "@/Components/revenue-card";
import StatsCard from "@/Components/stats-card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Briefcase, Cctv, CheckCheck, HardDrive } from "lucide-react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                <StatsCard
                    revenue="435"
                    growth="-"
                    icon={HardDrive} // Menyertakan ikon dari react-icons
                    bgColor="bg-teal-500" // Menentukan warna latar belakang
                    title="Total DVR"
                />
                <StatsCard
                    revenue="435"
                    growth="-"
                    icon={Cctv} // Menyertakan ikon dari react-icons
                    bgColor="bg-red-500" // Menentukan warna latar belakang
                    title="Total CCTV"
                />
                <StatsCard
                    revenue="435"
                    growth="-"
                    icon={Cctv} // Menyertakan ikon dari react-icons
                    bgColor="bg-red-500" // Menentukan warna latar belakang
                    title="Total DVR"
                />
                <StatsCard
                    revenue="435"
                    growth="-"
                    icon={Cctv} // Menyertakan ikon dari react-icons
                    bgColor="bg-red-500" // Menentukan warna latar belakang
                    title="Total DVR"
                />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-red-400 md:min-h-min" />
        </AuthenticatedLayout>
    );
}
