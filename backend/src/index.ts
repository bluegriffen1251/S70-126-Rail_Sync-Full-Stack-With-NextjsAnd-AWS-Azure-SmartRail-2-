import express from 'express';
// 👇 1. Import cors
import cors from 'cors'; 
import trainRoutes from './routes/trains';
// import bookingRoutes from './routes/bookings'; // (Keep this commented or removed)
import stationRoutes from './routes/stations';

const app = express();
const PORT = process.env.PORT || 8000;

// 👇 2. Enable CORS for EVERYONE (Easiest fix for now)
app.use(cors());

// Alternatively, strictly allow only your frontend:
// app.use(cors({
//   origin: ["http://localhost:3000", "https://your-frontend-url.vercel.app"]
// }));

app.use(express.json());

// Routes
app.use('/api/trains', trainRoutes);
app.use('/api/stations', stationRoutes);
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});