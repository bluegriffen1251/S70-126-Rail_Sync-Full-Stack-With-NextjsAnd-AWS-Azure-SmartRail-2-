import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllStations = async (req: Request, res: Response) => {
  try {
    const stations = await prisma.station.findMany();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stations" });
  }
};