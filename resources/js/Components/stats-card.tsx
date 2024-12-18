import React from "react";

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
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <div className="flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <h3 className="text-base text-gray-600">{title}</h3>
                    <div className={`${bgColor} text-white p-2 rounded-lg`}>
                        {/* Gunakan komponen Icon yang dipass sebagai properti */}
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
                <div className="mt-1">
                    <p className="text-4xl font-black font-lato text-gray-800">
                        {revenue}
                    </p>

                    <p className="text-sm text-green-500 mt-0">{growth}</p>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
