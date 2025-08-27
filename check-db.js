import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL);

console.log('🔍 Vérification directe de la base de données...');
try {
  const result = await sql`SELECT COUNT(*) as count FROM lessons`;
  console.log('📊 Nombre total de leçons:', result[0].count);
  
  const lessons = await sql`SELECT id, titre, concept, preview FROM lessons ORDER BY id LIMIT 5`;
  console.log('📝 Leçons trouvées:');
  lessons.forEach(lesson => {
    console.log(`- ID ${lesson.id}: ${lesson.titre}`);
  });
} catch (error) {
  console.error('❌ Erreur:', error.message);
}
