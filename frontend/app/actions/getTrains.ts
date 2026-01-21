'use server'

import { prisma } from '@/lib/prisma';

export async function getTrains() {
  console.log("Fetching trains from database...");

  try {
    const trains = await prisma.train.findMany({
      // ✅ FIX: Explicitly include the schedule
      include: {
        schedule: {
          // Bonus: Include station details so you can show Station Names, not just IDs
          include: {
            station: true 
          },
          // Bonus: Sort the schedule so stops appear in the correct order
          orderBy: {
            sequenceOrder: 'asc' 
          }
        }
      }
    });

    return trains;

  } catch (error) {
    console.error("Failed to fetch trains:", error);
    return [];
  }
}