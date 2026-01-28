import express from 'express';
import cors from 'cors';
import trainRoutes from './routes/trains';
import authRoutes from './routes/auth';
import bookingRoutes from './routes/bookings'; // 👈 1. IMPORT THIS

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes); // 👈 2. USE THIS

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});