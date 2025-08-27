import { neon } from '@neondatabase/serverless';

// URL directe depuis le .env
const connectionString = "postgresql://neondb_owner:npg_p6qsQSc3WPNZ@ep-solitary-shadow-adddfw09-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

console.log('🔍 Test direct avec URL complète...');
console.log('URL:', connectionString.substring(0, 50) + '...');

try {
  const sql = neon(connectionString);
  const result = await sql`SELECT id, titre, concept, preview FROM lessons ORDER BY id LIMIT 5`;
  console.log(`✅ Succès - ${result.length} leçons trouvées:`);
  result.forEach(lesson => {
    console.log(`- ID ${lesson.id}: ${lesson.titre}`);
  });
} catch (error) {
  console.error('❌ Erreur:', error.message);
  console.error('❌ Détails:', error);
}
