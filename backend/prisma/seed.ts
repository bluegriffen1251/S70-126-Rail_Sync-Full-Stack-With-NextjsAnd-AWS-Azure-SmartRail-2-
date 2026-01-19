import { PrismaClient } from "@prisma/client";
import "dotenv/config";

// SIMPLIFIED: Standard initialization (works out of the box)
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // 1. Create a User (Passenger)
  const user = await prisma.user.upsert({
    where: { email: 'passenger@example.com' },
    update: {},
    create: {
      email: 'passenger@example.com',
      name: 'Rahul Kumar',
    },
  });

  // 2. Create Stations
  const stationA = await prisma.station.upsert({
    where: { code: 'NDLS' },
    update: {},
    create: { name: 'New Delhi', code: 'NDLS' },
  });

  const stationB = await prisma.station.upsert({
    where: { code: 'CNB' },
    update: {},
    create: { name: 'Kanpur Central', code: 'CNB' },
  });

  const stationC = await prisma.station.upsert({
    where: { code: 'HWH' },
    update: {},
    create: { name: 'Howrah Jn', code: 'HWH' },
  });

  // 3. Create a Train with Schedule AND Inventory
  // UPDATED: Dates set to Jan 2026 so they are valid "upcoming" trains
  const train = await prisma.train.upsert({
    where: { trainNumber: '12302' },
    update: {
      availableSeats: 50 // Reset seats if re-running
    },
    create: {
      trainNumber: '12302',
      name: 'Kolkata Rajdhani',
      currentStatus: 'On Time',
      availableSeats: 50,
      schedule: {
        create: [
          {
            stationId: stationA.id,
            // Changed 2024 -> 2026
            arrivalTime: new Date('2026-01-20T16:50:00Z'),
            departureTime: new Date('2026-01-20T16:50:00Z'),
            sequenceOrder: 1
          },
          {
            stationId: stationB.id,
            // Changed 2024 -> 2026
            arrivalTime: new Date('2026-01-20T21:30:00Z'),
            departureTime: new Date('2026-01-20T21:35:00Z'),
            sequenceOrder: 2
          },
          {
            stationId: stationC.id,
            // Changed 2024 -> 2026
            arrivalTime: new Date('2026-01-21T09:55:00Z'),
            departureTime: new Date('2026-01-21T09:55:00Z'),
            sequenceOrder: 3
          }
        ]
      }
    }
  });

  console.log(`Created User: ${user.name}`);
  console.log(`Created Train: ${train.name} with ${train.availableSeats} seats`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });