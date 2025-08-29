import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';

const prisma = new PrismaClient();

let lastSyncTime = Date.now();
let syncTimeout = null;

async function syncSeedFile() {
  try {
    console.log('🔄 Synchronisation automatique détectée...');
    
    const lessons = await prisma.lesson.findMany({
      orderBy: { id: 'asc' }
    });

    if (lessons.length === 0) {
      console.log('❌ Aucune leçon trouvée.');
      return;
    }

    // Générer le contenu
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

    // Écrire le fichier
    const seedPath = path.join(process.cwd(), 'prisma', 'seed.ts');
    fs.writeFileSync(seedPath, seedContent, 'utf8');
    
    console.log(`✅ seed.ts mis à jour automatiquement avec ${lessons.length} leçon(s)`);
    console.log(`⏰ Synchronisé à ${new Date().toLocaleTimeString()}`);
    
  } catch (error) {
    console.error('❌ Erreur sync automatique:', error);
  }
}

async function checkForChanges() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 1
    });

    if (lessons.length > 0) {
      const latestUpdate = new Date(lessons[0].updatedAt).getTime();
      if (latestUpdate > lastSyncTime) {
        lastSyncTime = latestUpdate;
        
        // Débounce: attendre 2 secondes avant de synchroniser
        clearTimeout(syncTimeout);
        syncTimeout = setTimeout(syncSeedFile, 2000);
      }
    }
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error);
  }
}

console.log('👁️  Surveillance automatique des leçons activée...');
console.log('🔄 Le fichier seed.ts sera mis à jour automatiquement');
console.log('⌨️  Appuyez sur Ctrl+C pour arrêter');

// Vérifier toutes les 5 secondes
setInterval(checkForChanges, 5000);

// Synchronisation initiale
checkForChanges();
