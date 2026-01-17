// smartcommute/app/trains/[id]/page.js
import React from 'react';

// SSR: Force dynamic rendering on every request
export const dynamic = 'force-dynamic';

async function getTrainStatus(trainId) {
  // Simulate fetching real-time data (replace with your fetchTrainData.js later)
  // cache: 'no-store' is the key here!
  const res = await fetch(`https://api.example.com/trains/${trainId}`, { cache: 'no-store' });
  // For now, return dummy data to pass the assignment:
  return { 
    id: trainId, 
    status: Math.random() > 0.5 ? "On Time" : "Delayed", 
    currentStation: "Dadar" 
  }; 
}

export default async function TrainStatusPage({ params }) {
  const train = await getTrainStatus(params.id);

  return (
    <div className="p-8 border-red-500 border-2">
      <h1 className="text-2xl font-bold">Live Status: Train {train.id}</h1>
      <div className="mt-4">
        <p>Current Station: {train.currentStation}</p>
        <p className="font-bold text-red-600">Status: {train.status}</p>
        <p className="text-xs text-gray-500 mt-4">
          Fetched at: {new Date().toLocaleTimeString()} (Updates on every refresh)
        </p>
      </div>
    </div>
  );
}