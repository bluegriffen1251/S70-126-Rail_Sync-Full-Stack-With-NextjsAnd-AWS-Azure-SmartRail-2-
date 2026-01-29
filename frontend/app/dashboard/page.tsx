"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

// Define TypeScript interfaces for your data
interface Train {
  id: string;
  name: string;
  source: string; // Changed from 'from' to match typical DB schemas
  destination: string; // Changed from 'to'
  status: string;
  platform?: string; // Optional
}

export default function Dashboard() {
  const [user, setUser] = useState("Traveler");
  const [trains, setTrains] = useState<Train[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Fetch Data on Component Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        
        // Fetch Trains from your Backend
        const res = await fetch("http://localhost:8000/api/trains", {
          headers: {
            "Authorization": `Bearer ${token}`, // Send token if protected
          },
        });

        if (!res.ok) throw new Error("Failed to fetch train data");

        const data = await res.json();
        
        // Assuming your API returns { data: [...] } or just [...]
        // Adjust this line based on your actual API response structure!
        setTrains(Array.isArray(data) ? data : data.trains || []); 
        
      } catch (err) {
        console.error("API Error:", err);
        setError("Could not load live train data. Is the backend running?");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back! 👋</h1>
            <p className="text-gray-500 mt-1">Real-time updates from the Rail Sync Network.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
             {/* Buttons... */}
             <button className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">+ Book Ticket</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Live Train Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Live Train Feed
                </h2>
                <span className="text-xs font-medium text-gray-400">Live API Data</span>
              </div>
              
              <div className="divide-y divide-gray-50">
                {/* LOADING STATE */}
                {isLoading && (
                  <div className="p-10 text-center text-gray-500">
                    Loading live data...
                  </div>
                )}

                {/* ERROR STATE */}
                {error && (
                  <div className="p-10 text-center text-red-500">
                    {error}
                  </div>
                )}

                {/* DATA STATE */}
                {!isLoading && !error && trains.length === 0 && (
                  <div className="p-10 text-center text-gray-500">
                    No active trains found in the database.
                  </div>
                )}

                {!isLoading && trains.map((train) => (
                  <div key={train.id} className="p-5 hover:bg-gray-50 transition flex justify-between items-center group">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-gray-900">{train.name}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">#{train.id}</span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        {train.source} <span className="text-gray-300">→</span> {train.destination}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm text-green-600">
                        {train.status || "On Time"}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Platform {train.platform || "TBD"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (You can keep this mock or fetch bookings similarly) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full p-6">
               <h2 className="text-lg font-bold text-gray-900 mb-4">Your Bookings</h2>
               <p className="text-gray-500 text-sm">No recent bookings found.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
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
