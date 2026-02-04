import React from 'react';
import Link from 'next/link';
import { getTrainDetails } from '@/app/actions/getTrainDetails';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';

// This is a Server Component (fetches data before rendering)
export default async function LiveTrackingPage({ params }: { params: { trainId: string } }) {
  // 1. Fetch data for this specific train
  const train = await getTrainDetails(params.trainId);

  // 2. Handle "Not Found"
  if (!train) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">Train Not Found</h1>
        <Link href="/dashboard" className="text-blue-600 hover:underline mt-4">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  // Helper to format time
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Link href="/dashboard" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{train.name}</h1>
            <p className="text-gray-500">Train #{train.trainNumber}</p>
          </div>
          <div className={`ml-auto px-3 py-1 rounded-full text-sm font-bold border ${
             train.status === "On Time" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"
          }`}>
            {train.status}
          </div>
        </div>

        {/* Timeline Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Live Route Status
          </h2>

          <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
            {train.schedule?.map((stop: any, index: number) => (
              <div key={index} className="relative pl-8">
                {/* Dot Indicator */}
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${
                  index === 0 || index === (train.schedule.length - 1) 
                    ? "bg-blue-600 border-blue-100 w-5 h-5 -left-[11px]" 
                    : "bg-white border-gray-300"
                }`}></div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div>
                    <h3 className="font-bold text-gray-900">{stop.station.name}</h3>
                    <p className="text-xs text-gray-500">{stop.station.city} • Platform {stop.platform || "TBD"}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase font-bold">Arrival</span>
                      <span className="font-mono font-medium text-gray-800">{formatTime(stop.arrivalTime)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}