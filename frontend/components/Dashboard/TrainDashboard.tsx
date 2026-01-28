'use client';

import React, { useState } from 'react';
// This assumes your Card component is in components/ui/card.tsx
import { Card } from '../ui/card'; 
import { 
  Train, Clock, AlertOctagon, TrendingUp, 
  CheckCircle, Search, ArrowRight 
} from 'lucide-react';

// This assumes LiveStatusButton is in components/LiveStatusButton.tsx
// Since we are in components/Dashboard/, we go up one level (..) to find it.
import LiveStatusButton from '../LiveStatusButton';

// =========================================================
// 1. STATS OVERVIEW COMPONENT
// =========================================================
interface StatsProps {
  totalActive: number;
}

const StatsOverview: React.FC<StatsProps> = ({ totalActive }) => {
  const stats = [
    {
      label: 'Active Trains',
      value: totalActive,
      icon: <Train className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50',
    },
    {
      label: 'Avg Delay',
      value: '2 min', 
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50',
    },
    {
      label: 'Incidents',
      value: 'None',
      icon: <AlertOctagon className="w-6 h-6 text-green-600" />,
      bg: 'bg-green-50',
    },
    {
      label: 'On-Time %',
      value: '98%',
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="flex items-center gap-4 p-4">
          <div className={`p-3 rounded-xl ${stat.bg}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

// =========================================================
// 2. TRAIN STATUS CARD COMPONENT
// =========================================================
interface TrainCardProps {
  train: any; 
}

const TrainStatusCard: React.FC<TrainCardProps> = ({ train }) => {
  const trainName = train.name;
  const trainNumber = train.trainNumber;
  
  // Safe check to get stations, defaults to "Unknown" if data is missing
  const startStation = train.schedule?.[0]?.station?.name || "Origin";
  const endStation = train.schedule?.[train.schedule.length - 1]?.station?.name || "Destination";

  return (
    <Card className="hover:shadow-md transition-shadow p-5 flex flex-col h-full justify-between">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-900">{trainName}</h3>
          <span className="inline-block mt-1 bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-mono border border-slate-200">
            #{trainNumber}
          </span>
        </div>
        
        <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
          <CheckCircle className="w-3 h-3" />
          <span>Active</span>
        </div>
      </div>

      {/* ROUTE INFO */}
      <div className="space-y-4 mb-5">
        <div className="flex items-center justify-between text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div>
             <p className="text-[10px] text-slate-400 uppercase font-bold">From</p>
             <p className="font-semibold text-slate-700">{startStation}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />
          <div className="text-right">
             <p className="text-[10px] text-slate-400 uppercase font-bold">To</p>
             <p className="font-semibold text-slate-700">{endStation}</p>
          </div>
        </div>
      </div>

      {/* FOOTER: LIVE BUTTON */}
      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
         <span className="text-xs text-slate-400">Real-time tracking</span>
         {/* Pass the train number to our existing button logic */}
         <LiveStatusButton trainNumber={trainNumber} />
      </div>
    </Card>
  );
};

// =========================================================
// 3. MAIN EXPORTED DASHBOARD
// =========================================================
export default function TrainDashboard({ trains }: { trains: any[] }) {
  const [search, setSearch] = useState('');

  // Filter trains based on search input
  const filteredTrains = trains.filter(train => 
    train.name.toLowerCase().includes(search.toLowerCase()) ||
    train.trainNumber.includes(search) ||
    train.schedule?.[0]?.station?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <StatsOverview totalActive={trains.length} />

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
          placeholder="Search by Train Name or Number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid of Train Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTrains.length > 0 ? (
          filteredTrains.map((train) => (
            <TrainStatusCard key={train.id} train={train} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-400">No trains found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}