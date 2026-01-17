'use server'

import { prisma } from '../../src/lib/prisma'

export async function getTrains() {
  try {
    const trains = await prisma.train.findMany({
      include: {
        schedule: {
          include: {
            station: true, // Fetch station names for every stop
          },
          orderBy: {
            sequenceOrder: 'asc', // Sort stops by order (1, 2, 3)
          },
        },
      },
    });
    return trains;
  } catch (error) {
    console.error("Failed to fetch trains:", error);
    return [];
  }
}