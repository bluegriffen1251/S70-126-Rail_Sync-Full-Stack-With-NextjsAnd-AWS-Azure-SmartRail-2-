// backend/src/index.ts
import express from 'express';
import cors from 'cors'; // Import cors
import trainRoutes from './routes/trains'; // Your existing routes

const app = express();
const PORT = 8000; // Defining the port explicitly

// ALLOW REQUESTS FROM NEXT.JS
app.use(cors({
  origin: 'http://localhost:3000' 
}));

app.use(express.json());

// Mount your routes
app.use('/api/trains', trainRoutes); 

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});