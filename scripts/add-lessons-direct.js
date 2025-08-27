import { neon } from '@neondatabase/serverless';

const connectionString = process.env.NEON_DATABASE_URL || "postgresql://neondb_owner:npg_p6qsQSc3WPNZ@ep-solitary-shadow-adddfw09-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(connectionString);

const lessons = [
  {
    titre: "Faire bouger Nexie en boucle",
    concept: "Aujourd'hui, on découvre les événements et les mouvements. On démarre quand le drapeau vert est cliqué, on fait avancer Nexie et on répète l'action plusieurs fois.",
    preview: "Utiliser Events et Motion pour créer un mouvement répétitif simple.",
    step1: "Trouvez le bloc 'quand le drapeau vert est cliqué' (catégorie Événements) et placez-le dans l'espace de travail.",
    step2: "Ajoutez le bloc 'avancer de 10 pas' (catégorie Mouvement) et connectez-le sous le premier bloc.",
    step3: "Entourez le bloc 'avancer de 10 pas' avec 'répéter 4 fois' (catégorie Contrôle).",
    step4: "Ajoutez 'dire Bravo !' (catégorie Apparence) pour afficher un message à la fin."
  },
  {
    titre: "Animation avec sons",
    concept: "Créer une animation interactive avec des effets sonores. Combiner mouvement, apparence et sons.",
    preview: "Faire danser Nexie avec de la musique.",
    step1: "Commencez avec 'quand le drapeau vert est cliqué' (Événements).",
    step2: "Ajoutez 'jouer son jusqu'à la fin' (catégorie Sons).",
    step3: "Insérez 'tourner de 90 degrés' (catégorie Mouvement).",
    step4: "Terminez avec 'changer de costume' (catégorie Apparence)."
  },
  {
    titre: "تحريك الشخصية بالاتجاهات",
    concept: "تعلم كيفية تحريك الشخصية في اتجاهات مختلفة باستخدام أسهم لوحة المفاتيح.",
    preview: "التحكم في الشخصية بالأسهم.",
    step1: "ضع بلوك 'عند الضغط على السهم لليمين' من فئة الأحداث",
    step2: "أضف بلوك 'اتجه نحو 90 درجة' من فئة الحركة",
    step3: "ضع بلوك 'تحرك 10 خطوات' تحت البلوك السابق",
    step4: "كرر نفس الخطوات للسهم الأيسر مع اتجاه -90 درجة"
  }
];

async function addLessons() {
  console.log('🚀 Ajout des leçons dans la base de données Neon...');
  
  try {
    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      console.log(`📝 Ajout: ${lesson.titre}`);
      
      const result = await sql`
        INSERT INTO lessons (titre, concept, preview, step1, step2, step3, step4)
        VALUES (${lesson.titre}, ${lesson.concept}, ${lesson.preview}, ${lesson.step1}, ${lesson.step2}, ${lesson.step3}, ${lesson.step4})
        RETURNING id, titre
      `;
      
      console.log(`✅ Leçon créée avec ID: ${result[0].id} - ${result[0].titre}`);
    }
    
    console.log('\n🎉 Toutes les leçons ont été ajoutées !');
    
    // Vérifier le contenu final
    const allLessons = await sql`SELECT id, titre, concept FROM lessons ORDER BY id`;
    console.log('\n📚 Leçons dans la base de données:');
    allLessons.forEach((lesson, index) => {
      console.log(`${index + 1}. ID:${lesson.id} - ${lesson.titre}`);
      console.log(`   Concept: ${lesson.concept.substring(0, 50)}...`);
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

addLessons();
