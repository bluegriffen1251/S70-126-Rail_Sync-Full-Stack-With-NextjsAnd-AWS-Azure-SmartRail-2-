// 1. We go up to 'components', then into the 'Dashboard' folder to find the file
import TrainDashboard from '../../components/Dashboard/TrainDashboard';
import { getTrains } from '../actions/getTrains';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let trains = [];
  try {
    trains = await getTrains();
  } catch (e) {
    console.error("Failed to fetch trains:", e);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          🚄 Namma Metro & Local
        </h1>
        <p className="text-slate-500 mt-2">Live Bengaluru Commuter Dashboard</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <TrainDashboard trains={trains} />
      </div>
    </div>
  );
}