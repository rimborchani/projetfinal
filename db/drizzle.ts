import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Vérification que nous sommes côté serveur
if (typeof window !== 'undefined') {
  throw new Error('Drizzle ne peut être importé que côté serveur');
}

const connectionString = process.env.NEON_DATABASE_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('Missing DATABASE_URL or NEON_DATABASE_URL in environment');
}

// Create Neon HTTP SQL client and wrap with Drizzle
const sql = neon(connectionString);
export const db = drizzle(sql);
