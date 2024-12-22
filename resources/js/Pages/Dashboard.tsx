// import RevenueCard from "@/Components/revenue-card";
import KejadianChart from "@/Components/kejadian-chart";
import LatestKejadian from "@/Components/latest-kejadian";
import StatsCard from "@/Components/stats-card";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Activity,
    Briefcase,
    Cctv,
    CheckCheck,
    HardDrive,
    User,
} from "lucide-react";

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
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    {/* <CalendarDateRangePicker /> */}
                    <Button>Download</Button>
                </div>
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                <Link href="#">
                    <StatsCard
                        revenue="435"
                        growth="Jumlah Keseluruhan DVR"
                        icon={HardDrive} // Menyertakan ikon dari react-icons
                        bgColor="bg-teal-500" // Menentukan warna latar belakang
                        title="Total DVR"
                    />
                </Link>
                <Link href="">
                    <StatsCard
                        revenue="435"
                        growth="Jumlah Keseluruhan CCTV"
                        icon={Cctv} // Menyertakan ikon dari react-icons
                        bgColor="bg-red-500" // Menentukan warna latar belakang
                        title="Total CCTV"
                    />
                </Link>
                <Link href="">
                    <StatsCard
                        revenue="435"
                        growth="Jumlah Kejadian"
                        icon={Activity} // Menyertakan ikon dari react-icons
                        bgColor="bg-red-500" // Menentukan warna latar belakang
                        title="Kejadian"
                    />
                </Link>
                <Link href="">
                    <StatsCard
                        revenue="435"
                        growth="-"
                        icon={User} // Menyertakan ikon dari react-icons
                        bgColor="bg-red-500" // Menentukan warna latar belakang
                        title="Total Pengguna"
                    />
                </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Grafik Kejadian Tahun 2024</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <KejadianChart />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Kejadian Terbaru</CardTitle>
                        <CardDescription>
                            Ada 256 Kejadian Pada Minggu Ini
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LatestKejadian />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
