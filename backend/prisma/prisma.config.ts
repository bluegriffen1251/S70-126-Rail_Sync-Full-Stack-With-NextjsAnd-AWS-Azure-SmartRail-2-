import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    }),
  },

  migrations: {
    seed: "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts",
  },
});
