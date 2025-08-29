import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const exampleLessons = [
  {
    titre: "Faire bouger Nexie en boucle",
    concept: "Aujourd'hui, on découvre les événements et les mouvements. On démarre quand le drapeau vert est cliqué, on fait avancer Nexie et on répète l'action plusieurs fois.",
    preview: "Utiliser Events et Motion pour créer un mouvement répétitif simple",
    step1: "Trouvez le bloc 'quand le drapeau vert est cliqué' (catégorie Événements) et placez-le dans l'espace de travail.",
    step2: "Ajoutez le bloc 'avancer de 10 pas' (catégorie Mouvement) et connectez-le sous le premier bloc",
    step3: "Entourez le bloc 'avancer de 10 pas' avec 'répéter 4 fois' (catégorie Contrôle).",
    step4: "Ajoutez 'dire Bravo !' (catégorie Apparence) pour afficher un message à la fin"
  },
  {
    titre: "Apprendre les Sons avec Nexie",
    concept: "Découvrir comment faire jouer des sons et de la musique à Nexie en utilisant les blocs Sound",
    preview: "Créer une petite mélodie avec les blocs Son",
    step1: "Commencer avec le bloc 'quand le drapeau vert est cliqué",
    step2: "Ajouter un bloc 'jouer la note Do' depuis la catégorie Son",
    step3: "Ajouter un bloc 'attendre 1 seconde' pour créer une pause",
    step4: "Terminer avec 'jouer la note Mi' pour faire une petite mélodie"
  }
];

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
    console.log(`✅ Leçon créée: ${lesson.titre} (ID: ${lesson.id})`)
  }
  
  console.log('🎉 Seeding terminé avec succès!')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
