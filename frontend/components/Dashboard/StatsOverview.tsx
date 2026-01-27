import React from 'react';
import { Card } from '../ui/card';
import { Train, Clock, AlertOctagon, TrendingUp } from 'lucide-react';

interface StatsProps {
    totalActive: number;
    avgDelay: number;
    incidents: number;
    onTimePercentage: number;
}

export const StatsOverview: React.FC<StatsProps> = ({
    totalActive,
    avgDelay,
    incidents,
    onTimePercentage,
}) => {
    const stats = [
        {
            label: 'Active Trains',
            value: totalActive,
            icon: <Train className="w-6 h-6 text-blue-600" />,
            bg: 'bg-blue-50',
        },
        {
            label: 'Avg Delay',
            value: `${avgDelay} min`,
            icon: <Clock className="w-6 h-6 text-amber-600" />,
            bg: 'bg-amber-50',
        },
        {
            label: 'Incidents reported',
            value: incidents,
            icon: <AlertOctagon className="w-6 h-6 text-red-600" />,
            bg: 'bg-red-50',
        },
        {
            label: 'On-Time %',
            value: `${onTimePercentage}%`,
            icon: <TrendingUp className="w-6 h-6 text-green-600" />,
            bg: 'bg-green-50',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
};
