// 1. Use the '@/' alias so this import works from any folder
import { getTrains } from "@/app/actions/getTrains";

// 2. Define dates as 'string' because they come from JSON
type Station = {
  id: number;
  name: string;
};

type ScheduleStop = {
  id: number;
  trainId: number;
  stationId: number;
  arrivalTime: string; // Changed from Date to string
  sequenceOrder: number;
  station: Station;
};

type Train = {
  id: number;
  name: string;
  trainNumber: string;
  currentStatus: string;
  schedule: ScheduleStop[];
};

export default async function Home() {
  const trainsRaw = await getTrains();
  
  // Safety check: ensure trainsRaw is an array before mapping
  const trains: Train[] = Array.isArray(trainsRaw) ? trainsRaw : [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">🚆 Live Train Status</h1>
        
        <div className="grid gap-6">
          {trains.map((train) => {
            // 3. CRITICAL: Sort the schedule so stations appear in correct order (1 -> 2 -> 3)
            const sortedSchedule = [...train.schedule].sort((a, b) => a.sequenceOrder - b.sequenceOrder);

            return (
              <div key={train.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                {/* Train Header */}
                <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">{train.name}</h2>
                    <p className="text-blue-100 text-sm">#{train.trainNumber}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    train.currentStatus === 'On Time' ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'
                  }`}>
                    {train.currentStatus}
                  </div>
                </div>

                {/* Route Details */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Route Schedule</h3>
                  <div className="space-y-4">
                    {sortedSchedule.map((stop, index) => (
                      <div key={stop.id} className="flex items-start relative">
                        {/* Visual Timeline Line */}
                        {index !== sortedSchedule.length - 1 && (
                          <div className="absolute left-[19px] top-8 bottom-[-16px] w-0.5 bg-gray-200"></div>
                        )}
                        
                        {/* Station Dot */}
                        <div className="z-10 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border-2 border-blue-100 mr-4">
                          <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                        </div>
                        
                        {/* Station Info */}
                        <div>
                          <p className="font-medium text-gray-900">{stop.station.name}</p>
                          <p className="text-xs text-gray-500">
                            {/* We manually convert the string to a Date object here for formatting */}
                            Arr: {new Date(stop.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {trains.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-2">No trains found.</p>
              <p className="text-sm text-gray-400">Make sure your Backend is running on port 8000 and you ran the seed script.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}