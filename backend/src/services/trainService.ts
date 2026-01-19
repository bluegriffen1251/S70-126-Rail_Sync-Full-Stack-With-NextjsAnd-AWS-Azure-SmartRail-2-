import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:6996@localhost:5432/smartrail';

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const getAllTrains = async () => {
  return await prisma.train.findMany({
    include: {
      schedule: {
        include: {
          station: true,
        },
        orderBy: {
          sequenceOrder: 'asc',
        },
      },
    },
  });
};
