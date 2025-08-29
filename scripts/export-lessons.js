import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function exportLessons() {
  try {
    console.log('🔍 Récupération des leçons de la base de données...\n');
    
    const lessons = await prisma.lesson.findMany({
      orderBy: { id: 'asc' }
    });

    if (lessons.length === 0) {
      console.log('❌ Aucune leçon trouvée dans la base de données.');
      return;
    }

    console.log(`✅ ${lessons.length} leçon(s) trouvée(s).\n`);
    console.log('📋 Voici le code à copier dans votre fichier seed.ts :\n');
    console.log('```typescript');
    console.log('const exampleLessons = [');
    
    lessons.forEach((lesson, index) => {
      console.log('  {');
      console.log(`    titre: "${lesson.titre}",`);
      console.log(`    concept: "${lesson.concept}",`);
      console.log(`    preview: "${lesson.preview}",`);
      console.log(`    step1: "${lesson.step1}",`);
      console.log(`    step2: "${lesson.step2}",`);
      console.log(`    step3: "${lesson.step3}",`);
      console.log(`    step4: "${lesson.step4}"`);
      console.log(index < lessons.length - 1 ? '  },' : '  }');
    });
    
    console.log('];');
    console.log('```\n');
    
    console.log('📊 Résumé des leçons:');
    lessons.forEach((lesson, index) => {
      console.log(`${index + 1}. ${lesson.titre} (ID: ${lesson.id})`);
    });
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'exportation:', error);
  } finally {
    await prisma.$disconnect();
  }
}

exportLessons();
