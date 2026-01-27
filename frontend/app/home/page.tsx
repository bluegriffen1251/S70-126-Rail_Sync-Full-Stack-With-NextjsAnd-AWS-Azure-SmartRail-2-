import { getTrains } from '../actions/getTrains';
import LiveStatusButton from '../../components/LiveStatusButton';

// 1. SMART CROWD LOGIC 🧠
const getCrowdLevel = () => {
  const hour = new Date().getHours(); 
  // 🔴 PEAK
  if ((hour >= 8 && hour <= 11) || (hour >= 17 && hour <= 20)) {
    return { label: '🔴 High Rush', sub: 'Office Peak', color: 'bg-red-100 text-red-800 border-red-200' };
  }
  // 🟠 MODERATE
  if (hour === 7 || (hour >= 12 && hour <= 16) || hour === 21) {
    return { label: '🟠 Medium Rush', sub: 'Standard', color: 'bg-orange-100 text-orange-800 border-orange-200' };
  }
  // 🟢 OFF-PEAK
  return { label: '🟢 Low Rush', sub: 'Seats Available', color: 'bg-green-100 text-green-800 border-green-200' };
};

type Train = {
  id: number;
  name: string;
  trainNumber: string;
  type?: string; 
  availableSeats: number;
  // We need to access the schedule array to get station names
  schedule: {
    arrival: string;
    departure: string;
    station: { name: string };
  }[];
};

export default async function Home() {
  let trains: Train[] = [];
  let error = '';

  try {
    trains = await getTrains();
  } catch (e) {
    if (e instanceof Error) error = e.message;
  }

  const crowd = getCrowdLevel();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          🚄 Local train status
        </h1>
        <p className="text-slate-500 mt-2">Live Bengaluru Commuter Dashboard</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6 text-center">
           {error}
        </div>
      )}

      <div className="max-w-5xl mx-auto grid gap-6">
        {trains.map((train) => {
          // SAFEGUARDS: Check if schedule exists before trying to read it
          const startStation = train.schedule?.[0]?.station?.name || "Bengaluru";
          const endStation = train.schedule?.[1]?.station?.name || "Destination";

          return (
            <div key={train.id} className="bg-white shadow-sm rounded-xl overflow-hidden border border-slate-200 hover:shadow-md transition duration-200">
              
              <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{train.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-mono font-medium border border-slate-200">
                      #{train.trainNumber}
                    </span>
                  </div>
                </div>

                <div className={`flex flex-col items-end px-3 py-1.5 rounded-lg border ${crowd.color}`}>
                  <span className="text-xs font-bold uppercase tracking-wider">{crowd.label}</span>
                  <span className="text-[10px] opacity-80 font-medium">{crowd.sub}</span>
                </div>
              </div>

              {/* --- ROUTE INFO (START -> END) --- */}
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                 <div className="flex justify-between items-center text-sm text-gray-700">
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">From</p>
                        <p className="font-bold text-slate-800">{startStation}</p> 
                    </div>
                    <div className="text-slate-300 text-xl">➔</div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">To</p>
                        <p className="font-bold text-slate-800">{endStation}</p>
                    </div>
                 </div>
              </div>

              <div className="p-4 bg-white flex items-center justify-between">
                 <LiveStatusButton trainNumber={train.trainNumber} />
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}