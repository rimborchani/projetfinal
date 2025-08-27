import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const exampleLessons = [
  {
    titre: "Premiers pas en programmation",
    concept: "Introduction à la programmation visuelle avec événements et mouvements.",
    preview: "Démarrer avec le drapeau vert et faire avancer Nexie.",
    step1: "Trouvez le bloc 'quand le drapeau vert est cliqué' dans la catégorie Événements et placez-le dans l'espace de travail.",
    step2: "Ajoutez un bloc 'avancer de 10 pas' de la catégorie Mouvement sous le premier bloc.",
    step3: "Connectez un bloc 'répéter 3 fois' de la catégorie Contrôle.",
    step4: "Cliquez sur le drapeau vert pour voir votre personnage bouger !"
  },
  {
    titre: "Créer des sons et de la musique",
    concept: "Découvrir les blocs Son pour créer une petite mélodie.",
    preview: "Jouer des notes et ajouter un temps d'attente.",
    step1: "Commencez avec le bloc 'quand le drapeau vert est cliqué'.",
    step2: "Ajoutez un bloc 'jouer du piano' depuis la catégorie Son.",
    step3: "Insérez un bloc 'attendre 1 seconde' pour créer une pause.",
    step4: "Terminez avec un bloc 'jouer la note Do' pour créer une mélodie."
  },
  {
    titre: "Introduction au Chat Simple",
    concept: "تعلم كيف تبدأ الدردشة وتبعث رسالة ترحيب.",
    preview: "تهيئة اسم المستخدم وإرسال رسالة.",
    step1: "البدء بالبلوك 'كي الراية تتنقر' من فئة الأحداث",
    step2: "حط اسم المستخدم متاعك باستخدام بلوك 'حط اسم المستخدم'",
    step3: "ابعث رسالة ترحيب باستخدام بلوك 'ابعث رسالة'",
    step4: "زيد إيموجي مع بلوك 'زيد إيموجي' باش تخلي الشات أحلى!"
  },
  {
    titre: "Mouvements Avancés",
    concept: "تحريك الشخصية لمواضع مختلفة وبسلاسة.",
    preview: "الذهاب لمواقع واتجاهات محددة.",
    step1: "ابدا بالبلوك 'كي الراية تتنقر' من فئة الأحداث",
    step2: "روح للموقع س:100 ص:50 باستخدام بلوك 'روح للموقع'",
    step3: "اتجه نحو 90 درجة (يمين) مع بلوك 'اتجه نحو'",
    step4: "اطلع بسلاسة للموقع س:0 ص:0 في ثانيتين باستخدام 'انتقال سلس'"
  }
];

async function populateDatabase() {
  console.log('🚀 Début du peuplement de la base de données...');
  
  try {
    const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('NEON_DATABASE_URL/DATABASE_URL manquant dans l\'environnement');
    }
    
    const sql = neon(connectionString);
    console.log('📡 Connexion à Neon établie...');

    for (let i = 0; i < exampleLessons.length; i++) {
      const lesson = exampleLessons[i];
      console.log(`📝 Ajout de la leçon ${i + 1}: ${lesson.titre}`);
      
      const inserted = await sql`
        INSERT INTO lessons (titre, concept, preview, step1, step2, step3, step4)
        VALUES (${lesson.titre}, ${lesson.concept}, ${lesson.preview}, ${lesson.step1}, ${lesson.step2}, ${lesson.step3}, ${lesson.step4})
        RETURNING id
      `;
      
      console.log(`✅ Leçon "${lesson.titre}" ajoutée avec succès (ID: ${inserted[0].id})`);
    }
    
    console.log('🎉 Base de données peuplée avec succès !');
    console.log(`📊 ${exampleLessons.length} leçons ajoutées`);
    
    // Afficher les leçons créées
    const allLessons = await sql`SELECT id, titre, concept FROM lessons ORDER BY id`;
    console.log('\n📚 Leçons dans la base de données:');
    allLessons.forEach((lesson, index) => {
      console.log(`${index + 1}. ${lesson.titre} (ID: ${lesson.id})`);
      console.log(`   Concept: ${lesson.concept}`);
    });
    
  } catch (error) {
    console.error('❌ Erreur lors du peuplement de la base de données:', error);
    process.exit(1);
  }
}

// Exécuter le script
if (import.meta.url === `file://${process.argv[1]}`) {
  populateDatabase()
    .then(() => {
      console.log('\n✨ Script terminé avec succès !');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Erreur fatale:', error);
      process.exit(1);
    });
}

export { populateDatabase };
