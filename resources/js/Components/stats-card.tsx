import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Mendefinisikan tipe properti yang diterima komponen
interface RevenueCardProps {
    revenue: string;
    growth: string;
    icon: React.ElementType; // Gunakan ElementType untuk komponen ikon
    bgColor: string;
    title: string;
}

const StatsCard: React.FC<RevenueCardProps> = ({
    revenue,
    growth,
    bgColor,
    icon: Icon, // Alihkan komponen ikon dengan huruf besar
    title,
}) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold"> {revenue}</div>
                <p className="text-xs text-muted-foreground">{growth}</p>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
