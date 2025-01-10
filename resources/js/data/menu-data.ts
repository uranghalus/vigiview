import {
    Briefcase,
    CircleMinus,
    FileDigit,
    FileUser,
    HardDrive,
    LayoutDashboard,
    MonitorPlay,
    NotebookPen,
    SquareActivity,
    Workflow,
} from "lucide-react";
export const items = [
    {
        label: "Main Menu",
        items: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "Buku Kerja",
                url: "#",
                icon: Briefcase,
            },
            {
                title: "Master Kejadian",
                url: "#",
                icon: CircleMinus,
                items: [
                    {
                        title: "Pelapor/Korban/Pelaku",
                        url: "#",
                    },
                    {
                        title: "Nomor Polisi",
                        url: "#",
                    },
                    {
                        title: "Department",
                        url: "/master-kejadian/department",
                    },
                    {
                        title: "Jabatan",
                        url: "/master-kejadian/jabatan",
                    },
                    {
                        title: "Jenis Kelengkapan Dokumen",
                        url: "#",
                    },
                    {
                        title: "Kode Warning",
                        url: "#",
                    },
                ],
            },
            {
                title: "Master Perangkat",
                url: "#",
                icon: MonitorPlay,
                items: [
                    {
                        title: "History",
                        url: "#",
                    },
                    {
                        title: "Starred",
                        url: "#",
                    },
                    {
                        title: "Settings",
                        url: "#",
                    },
                ],
            },
            {
                title: "Data Perangkat",
                url: "#",
                icon: HardDrive,
                items: [
                    {
                        title: "History",
                        url: "#",
                    },
                    {
                        title: "Starred",
                        url: "#",
                    },
                    {
                        title: "Settings",
                        url: "#",
                    },
                ],
            },
            {
                title: "Kejadian",
                url: "#",
                icon: SquareActivity,
            },
            {
                title: "Disposisi",
                url: "#",
                icon: Workflow,
            },
        ],
    },
    {
        label: "Laporan",
        items: [
            {
                title: "Laporan Nopol Warning",
                url: "/settings/profile",
                icon: FileDigit,
            },
            {
                title: "Laporan Bulanan Kejadian",
                url: "/settings/profile",
                icon: FileUser,
            },
            {
                title: "Laporan Buku Kerja",
                url: "/settings/profile",
                icon: NotebookPen,
            },
        ],
    },
];
