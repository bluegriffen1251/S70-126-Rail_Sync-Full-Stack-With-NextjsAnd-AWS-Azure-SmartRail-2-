import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Start seeding ...')

  // 1. Create a User (Passenger) - Needed for the Transaction assignment!
  const user = await prisma.user.upsert({
    where: { email: 'passenger@example.com' },
    update: {},
    create: {
      email: 'passenger@example.com',
      name: 'Rahul Kumar',
    },
  })

  // 2. Create Stations
  const stationA = await prisma.station.upsert({
    where: { code: 'NDLS' },
    update: {},
    create: { name: 'New Delhi', code: 'NDLS' },
  })

  const stationB = await prisma.station.upsert({
    where: { code: 'CNB' },
    update: {},
    create: { name: 'Kanpur Central', code: 'CNB' },
  })

  const stationC = await prisma.station.upsert({
    where: { code: 'HWH' },
    update: {},
    create: { name: 'Howrah Jn', code: 'HWH' },
  })

  // 3. Create a Train with Schedule AND Inventory
  // We use upsert on trainNumber to avoid duplicates if you run seed twice
  const train = await prisma.train.upsert({
    where: { trainNumber: '12302' },
    update: {
      // If train exists, reset seats to 50 for testing transactions
      availableSeats: 50 
    },
    create: {
      trainNumber: '12302',
      name: 'Kolkata Rajdhani',
      currentStatus: 'On Time',
      availableSeats: 50, // <--- CRITICAL: This is your 'Stock'
      schedule: {
        create: [
          {
            stationId: stationA.id,
            arrivalTime: new Date('2024-01-20T16:50:00Z'),
            departureTime: new Date('2024-01-20T16:50:00Z'),
            sequenceOrder: 1
          },
          {
            stationId: stationB.id,
            arrivalTime: new Date('2024-01-20T21:30:00Z'),
            departureTime: new Date('2024-01-20T21:35:00Z'),
            sequenceOrder: 2
          },
          {
            stationId: stationC.id,
            arrivalTime: new Date('2024-01-21T09:55:00Z'),
            departureTime: new Date('2024-01-21T09:55:00Z'),
            sequenceOrder: 3
          }
        ]
      }
    }
  })

  console.log(`Created User: ${user.name}`)
  console.log(`Created Train: ${train.name} with ${train.availableSeats} seats`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })