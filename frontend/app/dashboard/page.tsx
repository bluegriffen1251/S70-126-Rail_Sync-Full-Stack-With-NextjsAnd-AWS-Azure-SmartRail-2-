import React from 'react';
import { StatsOverview } from '../../components/Dashboard/StatsOverview';
import { TrainStatusCard } from '../../components/Dashboard/TrainStatusCard';
import { Sidebar } from '../../components/Layout/Sidebar';
import { Header } from '../../components/Layout/Header';

const DashboardPage: React.FC = () => {
  // Mock Data
  const stats = {
    totalActive: 142,
    avgDelay: 12,
    incidents: 3,
    onTimePercentage: 88,
  };

  const liveTrains = [
    {
      trainNumber: '12951',
      trainName: 'Mumbai Rajdhani',
      status: 'On Time' as const,
      eta: '14:30',
      nextStation: 'Surat',
      delay: 0,
    },
    {
      trainNumber: '12009',
      trainName: 'Shatabdi Express',
      status: 'Delayed' as const,
      eta: '15:45',
      nextStation: 'Vadodara',
      delay: 25,
    },
    {
      trainNumber: '82901',
      trainName: 'Tejas Express',
      status: 'On Time' as const,
      eta: '16:10',
      nextStation: 'Ahmedabad',
      delay: 0,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <Header />

      <main className="pt-6 px-4 md:px-8 pb-12 md:ml-64 relative">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, John! 👋</h1>
          <p className="text-gray-500">Here's what's happening on your commute today.</p>
        </div>

        <div className="mb-8">
          <StatsOverview {...stats} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-900">Live Train Status</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-4">
              {liveTrains.map((train, index) => (
                <TrainStatusCard key={index} {...train} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-900">Quick Routes</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Manage</button>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="space-y-6">
                {/* Route 1 */}
                <div className="relative pl-6 border-l-2 border-gray-100 pb-1">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-50"></div>
                  <p className="font-medium text-gray-900 leading-none mb-1">Churchgate</p>
                  <p className="text-xs text-gray-400">09:00 AM</p>
                </div>
                <div className="relative pl-6 border-l-2 border-gray-100">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                  <p className="font-medium text-gray-900 leading-none mb-1">Borivali</p>
                  <p className="text-xs text-gray-400">~09:45 AM</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-50">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500">Best Route</span>
                  <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Fastest</span>
                </div>
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Start Navigation
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
