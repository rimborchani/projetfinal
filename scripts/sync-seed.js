import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function syncSeedWithDatabase() {
  try {
    console.log('🔄 Synchronisation du seed avec la base de données...\n');
    
    const lessons = await prisma.lesson.findMany({
      orderBy: { id: 'asc' }
    });

    if (lessons.length === 0) {
      console.log('❌ Aucune leçon trouvée dans la base de données.');
      return;
    }

    // Générer le contenu du fichier seed.ts
    let seedContent = `import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const exampleLessons = [
`;

    lessons.forEach((lesson, index) => {
      seedContent += `  {\n`;
      seedContent += `    titre: "${lesson.titre.replace(/"/g, '\\"')}",\n`;
      seedContent += `    concept: "${lesson.concept.replace(/"/g, '\\"')}",\n`;
      seedContent += `    preview: "${lesson.preview.replace(/"/g, '\\"')}",\n`;
      seedContent += `    step1: "${lesson.step1.replace(/"/g, '\\"')}",\n`;
      seedContent += `    step2: "${lesson.step2.replace(/"/g, '\\"')}",\n`;
      seedContent += `    step3: "${lesson.step3.replace(/"/g, '\\"')}",\n`;
      seedContent += `    step4: "${lesson.step4.replace(/"/g, '\\"')}"\n`;
      seedContent += index < lessons.length - 1 ? '  },\n' : '  }\n';
    });

    seedContent += `];

async function main() {
  console.log('🚀 Début du seeding de la base de données...')
  
  // Vider les leçons existantes
  await prisma.lesson.deleteMany()
  console.log('🧹 Leçons existantes supprimées')

  // Créer les nouvelles leçons
  for (const lessonData of exampleLessons) {
    const lesson = await prisma.lesson.create({
      data: lessonData
    })
    console.log(\`✅ Leçon créée: \${lesson.titre} (ID: \${lesson.id})\`)
  }
  
  console.log('🎉 Seeding terminé avec succès!')
}
main()
  .then(async () => {
    await prisma.\$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.\$disconnect()
    process.exit(1)
  })
`;

    // Écrire le fichier seed.ts
    const seedPath = path.join(process.cwd(), 'prisma', 'seed.ts');
    fs.writeFileSync(seedPath, seedContent, 'utf8');
    
    console.log(`✅ Fichier seed.ts mis à jour avec ${lessons.length} leçon(s)`);
    console.log('📝 Leçons synchronisées:');
    lessons.forEach((lesson, index) => {
      console.log(`${index + 1}. ${lesson.titre} (ID: ${lesson.id})`);
    });
    
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncSeedWithDatabase();
