import React from 'react';
import { getTrains } from '../actions/getTrains'; // 1. Fetch Real Data
import { Sidebar } from '../../components/Layout/Sidebar';
import { Header } from '../../components/Layout/Header';
import TrainDashboard from '../../components/Dashboard/TrainDashboard'; // 2. Import Smart Component

// Force dynamic rendering to ensure live updates
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // 3. Get the Real Database Data
  let trains = [];
  try {
    trains = await getTrains();
  } catch (e) {
    console.error("Error fetching trains:", e);
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 4. Your Professional Layout */}
      <Sidebar />
      <Header />

      <main className="pt-6 px-4 md:px-8 pb-12 md:ml-64 relative">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
          <p className="text-gray-500">Here is the live status of your commuter network.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: The Smart Dashboard (Takes up 2/3 space) */}
          <div className="xl:col-span-2 space-y-6">
             {/* This Component handles Search, Stats, and Live Tracking automatically */}
             <TrainDashboard trains={trains} />
          </div>

          {/* RIGHT COLUMN: Quick Routes (Your Static Design) */}
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
                  <p className="font-medium text-gray-900 leading-none mb-1">Whitefield</p>
                  <p className="text-xs text-gray-400">09:00 AM</p>
                </div>
                {/* Route 2 */}
                <div className="relative pl-6 border-l-2 border-gray-100">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                  <p className="font-medium text-gray-900 leading-none mb-1">KSR Bengaluru</p>
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

            {/* Extra Widget: Weather or Alerts could go here */}
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
               <h4 className="text-amber-800 font-bold text-sm mb-1">⚡ Service Alert</h4>
               <p className="text-amber-700 text-xs">Minor delays expected on the Purple Line due to maintenance.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};