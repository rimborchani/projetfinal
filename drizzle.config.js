import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/shema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL || process.env.DATABASE_URL,
  },
});
