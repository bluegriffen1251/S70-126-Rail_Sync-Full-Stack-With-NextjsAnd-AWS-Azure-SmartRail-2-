import { prisma } from "../lib/prisma";

export const getAllTrainsService = async () => {
  return await prisma.train.findMany({
    include: {
      // ✅ FIXED: Plural 'schedules'
      schedules: {
        include: {
          station: true
        }
      }
    }
  });
};