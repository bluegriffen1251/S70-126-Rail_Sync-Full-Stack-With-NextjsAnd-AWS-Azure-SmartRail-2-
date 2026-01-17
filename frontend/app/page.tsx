import { getTrains } from "./actions/getTrains";

export default async function Home() {
  const trains = await getTrains();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">🚆 Live Train Status</h1>
        
        <div className="grid gap-6">
          {trains.map((train) => (
            <div key={train.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                  {train.schedule.map((stop, index) => (
                    <div key={stop.id} className="flex items-start relative">
                      {/* Visual Timeline Line */}
                      {index !== train.schedule.length - 1 && (
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
                          Arr: {new Date(stop.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {trains.length === 0 && (
            <p className="text-center text-gray-500 mt-10">No trains found. Did you run the seed script?</p>
          )}
        </div>
      </div>
    </div>
  );
}