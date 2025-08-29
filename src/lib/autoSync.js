import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function autoSyncSeed() {
  try {
    console.log('🔄 Auto-synchronisation du seed...');
    
    const lessons = await prisma.lesson.findMany({
      orderBy: { id: 'asc' }
    });

    if (lessons.length === 0) return;

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

    // Écrire les fichiers seed
    const seedTsPath = path.join(process.cwd(), 'prisma', 'seed.ts');
    const seedJsPath = path.join(process.cwd(), 'prisma', 'seed.js');
    
    fs.writeFileSync(seedTsPath, seedContent, 'utf8');
    // Convertir en JS aussi
    const jsContent = seedContent.replace(/import.*from.*'@prisma\/client'/, "import { PrismaClient } from '@prisma/client';");
    fs.writeFileSync(seedJsPath, jsContent, 'utf8');
    
    console.log(`✅ Seed auto-synchronisé avec ${lessons.length} leçon(s)`);
    
  } catch (error) {
    console.error('❌ Erreur auto-sync:', error);
  }
}

export default autoSyncSeed;
