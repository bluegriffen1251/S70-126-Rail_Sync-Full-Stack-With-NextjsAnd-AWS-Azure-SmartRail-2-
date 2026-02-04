import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// 1. Get All Trains
export const getTrains = async (req: Request, res: Response) => {
  try {
    const trains = await prisma.train.findMany({
      include: {
        // ✅ FIXED: Using 'schedules' (Plural) as requested by the server logs
        schedules: {
          include: {
            station: true,
          },
          orderBy: {
            arrivalTime: 'asc',
          },
        },
      },
    });

    res.json(trains);
  } catch (error) {
    console.error("Error fetching trains:", error);
    res.status(500).json({ error: "Failed to fetch trains" });
  }
};

// 2. Get Single Train
export const getTrainById = async (req: Request, res: Response) => {
  try {
    // ✅ FIXED: Force 'id' to be a string to fix the "string | string[]" error
    const id = req.params.id as string;

    const train = await prisma.train.findFirst({
      where: {
        OR: [
          { id: id },
          { trainNumber: id }
        ]
      },
      include: {
        // ✅ FIXED: Using 'schedules' (Plural)
        schedules: {
          include: {
            station: true,
          },
          orderBy: {
            arrivalTime: 'asc',
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