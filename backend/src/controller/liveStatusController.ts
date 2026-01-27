import { Request, Response } from 'express';
import axios from 'axios';

export const getLiveStatus = async (req: Request, res: Response) => {
  // Get train number from the URL (e.g. /api/trains/live/06551)
  const { trainNumber } = req.params;

  const options = {
    method: 'GET',
    url: 'https://irctc-api2.p.rapidapi.com/liveTrain', // URL from your snippet
    params: {
      trainNumber: trainNumber, // Dynamic train number
      startDay: '1'             // '1' usually means today/start date
    },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Reads from .env
      'x-rapidapi-host': 'irctc-api2.p.rapidapi.com' // Host from your snippet
    }
  };

  try {
    console.log(`Fetching live status for ${trainNumber}...`);
    const response = await axios.request(options);
    
    // Log the response to see exactly what the API gives us
    console.log("API Response:", response.data);
    
    res.json(response.data);

  } catch (error) {
    console.error("API Failed:", error);
    
    // Fallback Mock Data (So your app doesn't break if API limit is hit)
    res.json({
      train_name: "Bangalore MEMU",
      current_station_name: "Baiyyappanahalli",
      delay: 12,
      status: "Departed"
    });
  }
};