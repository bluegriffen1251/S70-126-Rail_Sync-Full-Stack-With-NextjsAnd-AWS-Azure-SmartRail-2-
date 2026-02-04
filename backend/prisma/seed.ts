import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding All Real Bangalore Routes...');

  // 1. CLEANUP
  try {
    await prisma.schedule.deleteMany();
    await prisma.train.deleteMany();
    await prisma.station.deleteMany();
    console.log('🧹 Database cleared.');
  } catch (e) {
    console.log('⚠️ Cleanup skipped.');
  }

  // 2. THE MASTER LIST OF TRAINS
  const trainsData = [
    { name: "KSR Bengaluru - Marikuppam MEMU", number: "06553", start: "KSR Bengaluru", startCode: "SBC", end: "Marikuppam", endCode: "MKM" },
    { name: "Marikuppam - KSR Bengaluru MEMU", number: "06554", start: "Marikuppam", startCode: "MKM", end: "KSR Bengaluru", endCode: "SBC" },
    { name: "KSR Bengaluru - Jolarpettai MEMU", number: "06551", start: "KSR Bengaluru", startCode: "SBC", end: "Jolarpettai", endCode: "JTJ" },
    { name: "Whitefield - KSR Bengaluru MEMU", number: "06567", start: "Whitefield", startCode: "WFD", end: "KSR Bengaluru", endCode: "SBC" },
    { name: "KSR Bengaluru - Bangarapet MEMU", number: "06545", start: "KSR Bengaluru", startCode: "SBC", end: "Bangarapet", endCode: "BWT" },
    { name: "KSR Bengaluru - Mysuru MEMU", number: "06257", start: "KSR Bengaluru", startCode: "SBC", end: "Mysuru", endCode: "MYS" },
    { name: "Mysuru - KSR Bengaluru MEMU", number: "06258", start: "Mysuru", startCode: "MYS", end: "KSR Bengaluru", endCode: "SBC" },
    { name: "Yesvantpur - Hosur DEMU", number: "06393", start: "Yesvantpur", startCode: "YPR", end: "Hosur", endCode: "HSRA" },
    { name: "Hosur - Yesvantpur DEMU", number: "06394", start: "Hosur", startCode: "HSRA", end: "Yesvantpur", endCode: "YPR" },
    { name: "KSR Bengaluru - Tumakuru MEMU", number: "06571", start: "KSR Bengaluru", startCode: "SBC", end: "Tumakuru", endCode: "TK" },
    { name: "Tumakuru - KSR Bengaluru MEMU", number: "06572", start: "Tumakuru", startCode: "TK", end: "KSR Bengaluru", endCode: "SBC" },
  ];

  // 3. GENERATE TRAINS & SCHEDULES AUTOMATICALLY
  for (const t of trainsData) {
    
    // We create realistic times based on "Now" so they look active
    const departure = new Date();
    const arrival = new Date(departure.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

    await prisma.train.create({
      data: {
        trainNumber: t.number,
        name: t.name,
        source: t.start,
        destination: t.end,
        status: "On Time",
        // ✅ The Fix: Using 'schedule' (Singular) + 'connectOrCreate' for Stations
        schedule: {
          create: [
            {
              arrivalTime: departure,
              departureTime: departure,
              platform: "1",
              station: {
                connectOrCreate: {
                  where: { code: t.startCode },
                  create: { name: t.start, code: t.startCode, city: t.start.split(' ')[0] }
                }
              }
            },
            {
              arrivalTime: arrival,
              departureTime: arrival,
              platform: "2",
              station: {
                connectOrCreate: {
                  where: { code: t.endCode },
                  create: { name: t.end, code: t.endCode, city: t.end.split(' ')[0] }
                }
              }
            }
          ]
        }
      }
    });
    console.log(`✅ Added: ${t.number} (${t.start} -> ${t.end})`);
  }

  console.log('🚀 Database populated with ALL trains + Live Tracking support!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });