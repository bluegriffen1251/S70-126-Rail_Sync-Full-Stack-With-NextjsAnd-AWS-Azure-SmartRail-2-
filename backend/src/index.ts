import express from 'express';
import cors from 'cors'; 

// 👇 Import your routes
import authRoutes from './routes/auth';      // <--- ADD THIS
import userRoutes from './routes/users';     // <--- ADD THIS
import trainRoutes from './routes/trains';
import stationRoutes from './routes/stations';
import bookingRoutes from './routes/bookings'; // <--- Uncomment this too!

const app = express();
const PORT = process.env.PORT || 8000;

// 👇 1. Enable CORS for EVERYONE (Correct!)
app.use(cors());

// 👇 2. Enable JSON parsing (Required for POST requests)
app.use(express.json());

// 👇 3. Mount Routes
app.use('/api/auth', authRoutes);       // <--- CRITICAL for Login/Signup
app.use('/api/users', userRoutes);      // <--- CRITICAL for Profile
app.use('/api/trains', trainRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/bookings', bookingRoutes); // <--- CRITICAL for Booking

// Health Check Route (Optional but good for testing)
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});