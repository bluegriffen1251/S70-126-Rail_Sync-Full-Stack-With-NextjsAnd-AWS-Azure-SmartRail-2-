import Link from "next/link";
import { getTrains } from "./actions/getTrains";

type Station = {
  id: number;
  name: string;
};

type ScheduleStop = {
  id: number;
  trainId: number;
  stationId: number;
  arrivalTime: Date;
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
  const trains = await getTrains();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- HEADER WITH LOGIN/SIGNUP BUTTONS --- */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo / Brand */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold text-blue-900 tracking-tight">
                Rail Sync
              </span>
            </div>

            {/* Auth Buttons */}
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO / WELCOME SECTION --- */}
      <div className="bg-blue-900 text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Rail Sync</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Track live train schedules and book your journey seamlessly.
          Check out the live status below.
        </p>
      </div>

      {/* --- EXISTING TRAIN LIST --- */}
      <div className="max-w-4xl mx-auto p-8 -mt-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex justify-between items-center">
             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                🚆 Live Status
             </h2>
             <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {trains.length} Trains Active
             </span>
        </div>

        <div className="grid gap-6">
          {trains.map((train: Train) => (
            <div
              key={train.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Train Header */}
              <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{train.name}</h2>
                  <p className="text-blue-100 text-sm">#{train.trainNumber}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    train.currentStatus === "On Time"
                      ? "bg-green-400 text-green-900"
                      : "bg-red-400 text-red-900"
                  }`}
                >
                  {train.currentStatus}
                </div>
              </div>

              {/* Route Details */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Route Schedule
                </h3>
                <div className="space-y-4">
                  {train.schedule.map((stop: ScheduleStop, index: number) => (
                    <div key={stop.id} className="flex items-start relative">
                      {/* Visual Timeline Line */}
                      {index !== train.schedule.length - 1 && (
                        <div className="absolute left-[19px] top-8 bottom-[-16px] w-0.5 bg-gray-200"></div>
                      )}

                      {/* Station Dot */}
                      <div className="z-10 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border-2 border-blue-100 mr-4">
                        <span className="text-xs font-bold text-blue-600">
                          {index + 1}
                        </span>
                      </div>

                      {/* Station Info */}
                      <div>
                        <p className="font-medium text-gray-900">
                          {stop.station.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Arr:{" "}
                          {new Date(stop.arrivalTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {trains.length === 0 && (
            <div className="text-center py-10 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">No trains found. Did you run the seed script?</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}