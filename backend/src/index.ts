import express from 'express';
import cors from 'cors';
import trainRoutes from './routes/trains';
import authRoutes from './routes/auth'; // <--- 1. Import Auth Routes

const app = express();
const PORT = 8000;

// ALLOW REQUESTS FROM NEXT.JS
app.use(cors({
  origin: 'http://localhost:3000' 
}));

app.use(express.json());

// Mount your routes
app.use('/api/trains', trainRoutes);
app.use('/api/auth', authRoutes); // <--- 2. Enable Auth Routes here

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});