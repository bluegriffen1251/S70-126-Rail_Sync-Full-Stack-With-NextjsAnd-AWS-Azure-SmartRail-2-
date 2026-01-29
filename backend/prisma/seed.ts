import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Real Bangalore Routes...');

  const p = prisma as any;
  if (p.booking) await p.booking.deleteMany();
  if (p.stop) await p.stop.deleteMany();
  await prisma.train.deleteMany();
  if (p.station) await p.station.deleteMany();

  // 1. DATA: Defined with Start and End Stations
  const trainsData = [
    { name: "KSR Bengaluru - Marikuppam MEMU", number: "06553", start: "KSR Bengaluru", end: "Marikuppam" },
    { name: "Marikuppam - KSR Bengaluru MEMU", number: "06554", start: "Marikuppam", end: "KSR Bengaluru" },
    { name: "KSR Bengaluru - Jolarpettai MEMU", number: "06551", start: "KSR Bengaluru", end: "Jolarpettai" },
    { name: "Whitefield - KSR Bengaluru MEMU", number: "06567", start: "Whitefield", end: "KSR Bengaluru" },
    { name: "KSR Bengaluru - Bangarapet MEMU", number: "06545", start: "KSR Bengaluru", end: "Bangarapet" },
    { name: "KSR Bengaluru - Mysuru MEMU", number: "06257", start: "KSR Bengaluru", end: "Mysuru" },
    { name: "Mysuru - KSR Bengaluru MEMU", number: "06258", start: "Mysuru", end: "KSR Bengaluru" },
    { name: "Yesvantpur - Hosur DEMU", number: "06393", start: "Yesvantpur", end: "Hosur" },
    { name: "Hosur - Yesvantpur DEMU", number: "06394", start: "Hosur", end: "Yesvantpur" },
    { name: "KSR Bengaluru - Tumakuru MEMU", number: "06571", start: "KSR Bengaluru", end: "Tumakuru" },
    { name: "Tumakuru - KSR Bengaluru MEMU", number: "06572", start: "Tumakuru", end: "KSR Bengaluru" },
  ];

  // 2. INSERTION
  for (const train of trainsData) {
    const scheduleData = p.stop ? {
      create: [
        {
          station: { create: { name: train.start, code: train.start.substring(0, 3).toUpperCase(), latitude: 0, longitude: 0 } },
          arrival: new Date(),
          departure: new Date(),
          stopOrder: 1
        },
        {
          station: { create: { name: train.end, code: train.end.substring(0, 3).toUpperCase(), latitude: 0, longitude: 0 } },
          arrival: new Date(),
          departure: new Date(),
          stopOrder: 2
        }
      ]
    } : undefined;

    await prisma.train.create({
      data: {
        name: train.name,
        trainNumber: train.number,
        availableSeats: 0,
        currentStatus: "On Time",
        schedule: scheduleData
      }
    });
    console.log(`✅ Created Route: ${train.start} ➔ ${train.end}`);
  }

  console.log('🚀 Database updated with Real Routes!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });