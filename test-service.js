import dotenv from 'dotenv';
dotenv.config();

import { LessonService } from './src/lib/lessonService.js';

console.log('🔍 Test du LessonService avec variables d\'environnement...');
try {
  const result = await LessonService.getAllLessons();
  console.log('✅ Succès:', {
    type: typeof result,
    isArray: Array.isArray(result),
    length: result ? result.length : 'null'
  });
  if (result && result.length > 0) {
    console.log('📝 Leçons trouvées:');
    result.forEach(lesson => {
      console.log(`- ID ${lesson.id}: ${lesson.title}`);
    });
  }
} catch (error) {
  console.error('❌ Erreur complète:', error);
}
