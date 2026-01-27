'use client';

import { useState } from 'react';
import { MapPin, Loader2, XCircle, Train, Clock, AlertTriangle } from 'lucide-react';

export default function LiveStatusButton({ trainNumber }: { trainNumber: string }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const checkLiveStatus = async () => {
    setLoading(true);
    setIsOpen(true);
    setError('');
    setStatus(null);

    try {
      // ---------------------------------------------------------
      // 🔧  CONFIGURATION ZONE: PASTE YOUR NEW API DETAILS HERE
      // ---------------------------------------------------------
      
      // 1. Enter your new API URL (Keep the ${trainNumber} part!)
      // Example: `https://new-api.com/status?train=${trainNumber}`
      const API_URL = `https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus?trainNo=${trainNumber}&startDay=1`;

      // 2. Enter your Headers (Key/Host) if required
      const HEADERS = {
        'X-RapidAPI-Key': '7ea4e82fc4mshac2b0ad9b3c49e7p1e9a09jsn9e55b6560bf8',
        'X-RapidAPI-Host': 'irctc1.p.rapidapi.com' 
      };

      // ---------------------------------------------------------

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: HEADERS
      });

      const data = await response.json();

      // ⚠️ ADAPT THIS LOGIC TO YOUR NEW API
      // Different APIs send data differently. You might need to change 'data.data' 
      // to just 'data' or 'data.position', etc.
      if (data.status === true && data.data) {
        setStatus({
          // Map the new API fields to our UI fields
          current_station: data.data.current_station_name || 'In Transit',
          message: data.data.status_message || 'Tracking active',
          delay: data.data.delay || 0,
          next_stop: data.data.upcoming_stations?.[0]?.station_name || 'Unknown'
        });
      } else {
        setError('Train not found in this API.');
      }

    } catch (err) {
      setError('Connection failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={checkLiveStatus}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
      >
        <MapPin className="w-3 h-3" />
        Track Live
      </button>

      {/* POPUP MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Train className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Live Status</h3>
                  <p className="text-xs text-slate-400">Train #{trainNumber}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-700 rounded-full transition">
                <XCircle className="w-6 h-6 text-slate-400 hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-8 text-slate-500 gap-3">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                  <p className="font-medium animate-pulse">Fetching Data...</p>
                </div>
              ) : error ? (
                <div className="text-center py-6">
                  <div className="bg-red-100 p-3 rounded-full inline-block mb-3">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              ) : status ? (
                <div className="space-y-6">
                  <div className="text-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-xs text-blue-600 uppercase font-bold tracking-wider mb-1">Current Location</p>
                    <p className="text-2xl font-black text-slate-800">{status.current_station}</p>
                    <p className="text-sm text-slate-500 mt-1 font-medium">{status.message}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                      <Clock className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Delay</p>
                      <p className={`text-lg font-bold ${status.delay > 10 ? 'text-red-600' : 'text-green-600'}`}>
                        {status.delay} min
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                      <MapPin className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Next Stop</p>
                      <p className="text-sm font-bold text-slate-700 truncate px-2">{status.next_stop}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
              <button onClick={() => setIsOpen(false)} className="text-sm font-semibold text-slate-600 hover:text-slate-900">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}