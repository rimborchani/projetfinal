import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Vérification que nous sommes côté serveur
if (typeof window !== 'undefined') {
  throw new Error('Drizzle ne peut être importé que côté serveur');
}

// Charger les variables d'environnement de Next.js
const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

console.log('🔍 Configuration Drizzle:');
console.log('- NEON_DATABASE_URL exists:', !!process.env.NEON_DATABASE_URL);
console.log('- DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('- Final URL length:', connectionString?.length || 0);
console.log('- URL preview:', connectionString?.substring(0, 50) + '...' || 'UNDEFINED');

if (!connectionString) {
  throw new Error('Missing DATABASE_URL or NEON_DATABASE_URL in environment variables');
}

// Create Neon HTTP SQL client and wrap with Drizzle
const sql = neon(connectionString);
export const db = drizzle(sql);
