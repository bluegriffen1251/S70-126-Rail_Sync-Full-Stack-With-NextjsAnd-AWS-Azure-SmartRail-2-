import { Request, Response } from 'express';
import { prisma } from '../lib/prisma'; // Importing the client we made earlier

export const getTrains = async (req: Request, res: Response) => {
  try {
    const trains = await prisma.train.findMany({
      include: {
        schedule: {
          include: {
            station: true // Include station names in the schedule
          }
        }
      }
    });

    res.json(trains);
  } catch (error) {
    console.error("Error fetching trains:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};