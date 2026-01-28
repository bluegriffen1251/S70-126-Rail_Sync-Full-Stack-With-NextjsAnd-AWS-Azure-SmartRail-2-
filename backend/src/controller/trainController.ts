import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTrains = async (req: Request, res: Response) => {
  try {
    console.log("Fetching trains from database...");
    
    // SIMPLE FETCH: Just get the trains, no complex relations yet
    const trains = await prisma.train.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    });

    console.log(`Found ${trains.length} trains.`);
    res.json(trains);
  } catch (error) {
    console.error("Error fetching trains:", error);
    res.status(500).json({ error: "Failed to fetch live train data" });
  }
};