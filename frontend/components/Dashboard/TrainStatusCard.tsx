import React from 'react';
import { Card } from '../ui/card';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface TrainStatusProps {
    trainNumber: string;
    trainName: string;
    status: 'On Time' | 'Delayed' | 'Cancelled';
    delay?: number; // in minutes
    eta: string;
    nextStation: string;
}

export const TrainStatusCard: React.FC<TrainStatusProps> = ({
    trainNumber,
    trainName,
    status,
    delay,
    eta,
    nextStation,
}) => {
    const getStatusColor = () => {
        switch (status) {
            case 'On Time':
                return 'text-green-600 bg-green-50';
            case 'Delayed':
                return 'text-amber-600 bg-amber-50';
            case 'Cancelled':
                return 'text-red-600 bg-red-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'On Time':
                return <CheckCircle className="w-5 h-5" />;
            case 'Delayed':
                return <Clock className="w-5 h-5" />;
            case 'Cancelled':
                return <AlertTriangle className="w-5 h-5" />;
            default:
                return null;
        }
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-lg text-gray-900">{trainName}</h3>
                    <p className="text-sm text-gray-500">#{trainNumber}</p>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
                    {getStatusIcon()}
                    <span>{status} {delay && delay > 0 ? `(+${delay} min)` : ''}</span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Next Station</span>
                    <span className="font-medium text-gray-900">{nextStation}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Estimated Arrival</span>
                    <span className="font-medium text-gray-900">{eta}</span>
                </div>
            </div>
        </Card>
    );
};
