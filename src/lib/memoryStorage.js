// Stockage en mémoire partagé pour toute l'application
// Sera remplacé par une vraie base de données quand configurée

class MemoryStorage {
  constructor() {
    // Stockage mémoire partagé pour les leçons (source de vérité unique)
    this.lessons = [
      {
        id: 1,
        titre: "Premiers pas en programmation",
        concept: "Introduction à la programmation visuelle.",
        preview: "Un aperçu de la première leçon.",
        step1: "Trouvez le bloc 'quand le drapeau vert est cliqué' dans la catégorie Événements et placez-le dans l'espace de travail.",
        step2: "Ajoutez un bloc 'avancer de 10 pas' de la catégorie Mouvement sous le premier bloc.",
        step3: "Connectez un bloc 'répéter 3 fois' de la catégorie Contrôle.",
        step4: "Cliquez sur le drapeau vert pour voir votre personnage bouger !",
        created_at: new Date().toISOString()
      }
    ];
    this.nextId = 2;
  }

  getAllLessons() {
    return [...this.lessons]; // Retourne une copie pour éviter les mutations
  }

  getLesson(id) {
    return this.lessons.find(lesson => lesson.id === id);
  }

  createLesson(titre, concept, preview, step1, step2, step3, step4) {
    const newLesson = {
      id: this.nextId++,
      titre,
    concept,
    preview,
      step1,
      step2,
      step3,
      step4,
      created_at: new Date().toISOString()
    };
    
    this.lessons.push(newLesson);
    console.log(`✅ Leçon créée en mémoire: "${titre}" (ID: ${newLesson.id})`);
    return newLesson;
  }

  updateLesson(id, titre, concept, preview, step1, step2, step3, step4) {
    const lessonIndex = this.lessons.findIndex(l => l.id === id);
    
    if (lessonIndex === -1) {
      return null;
    }
    
    this.lessons[lessonIndex] = {
      ...this.lessons[lessonIndex],
      titre,
    concept,
    preview,
      step1,
      step2,
      step3,
      step4
    };
    
    console.log(`✅ Leçon mise à jour en mémoire: "${titre}" (ID: ${id})`);
    return this.lessons[lessonIndex];
  }

  deleteLesson(id) {
    const lessonIndex = this.lessons.findIndex(l => l.id === id);
    
    if (lessonIndex === -1) {
      return false;
    }
    
    const deletedLesson = this.lessons[lessonIndex];
    this.lessons.splice(lessonIndex, 1);
    console.log(`✅ Leçon supprimée de la mémoire: "${deletedLesson.titre}" (ID: ${id})`);
    return true;
  }

  // Transforme les données internes vers le format attendu par l'application
  transformLesson(lesson) {
    return {
      id: lesson.id,
  title: lesson.titre,
  concept: lesson.concept ?? lesson.step1,
  preview: lesson.preview ?? '',
      tasks: [
        {
          id: 1,
          instruction: lesson.step1,
          blockType: "event_whenflagclicked",
          category: "Events",
          blockImage: "/blocks/when-flag-clicked.png",
          hint: "Commencez par cliquer sur le drapeau vert!"
        },
        {
          id: 2,
          instruction: lesson.step2,
          blockType: "motion_movesteps",
          category: "Motion",
          blockImage: "/blocks/move-steps.png",
          hint: "Utilisez les blocs de mouvement pour déplacer votre personnage."
        },
        {
          id: 3,
          instruction: lesson.step3,
          blockType: "control_repeat",
          category: "Control",
          blockImage: "/blocks/repeat.png",
          hint: "Les boucles vous permettent de répéter des actions."
        },
        {
          id: 4,
          instruction: lesson.step4,
          blockType: "looks_say",
          category: "Looks",
          blockImage: "/blocks/say.png",
          hint: "Faites parler votre personnage!"
        }
      ],
      toolboxCategories: ["Events", "Motion", "Control", "Looks"],
      sprite: {
        name: "Nexie",
        image: "/sprites/nexie-cat.png",
        startPosition: { x: 0, y: 0 }
      }
    };
  }

  transformAllLessons() {
    return this.lessons.map(lesson => this.transformLesson(lesson));
  }
}

// Instance singleton partagée
const memoryStorage = new MemoryStorage();

export default memoryStorage;
