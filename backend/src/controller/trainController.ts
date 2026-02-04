import { Request, Response } from 'express';
// ✅ Use the shared Prisma instance (prevents connection crashes)
import { prisma } from "../lib/prisma";

// 1. Get All Trains
export const getTrains = async (req: Request, res: Response) => {
  try {
    console.log("Fetching trains from database...");
    
    const trains = await prisma.train.findMany({
      orderBy: {
        updatedAt: 'desc' 
      },
      include: {
        // 👇 FIXED: Changed 'schedule' to 'schedules' (Plural)
        schedules: {
          include: {
            station: true
          }
        }
      }
    });

    console.log(`Found ${trains.length} trains.`);
    res.json(trains);
  } catch (error) {
    console.error("Error fetching trains:", error);
    res.status(500).json({ error: "Failed to fetch live train data" });
  }
};

// 2. Get Single Train (Added this back so the route map works)
export const getTrainById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const train = await prisma.train.findUnique({
      where: { id },
      include: {
        schedules: {
          include: {
            station: true,
          },
        },
      },
    });

    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }

    res.json(train);
  } catch (error) {
    console.error("Error fetching train:", error);
    res.status(500).json({ error: "Failed to fetch train" });
  }
};