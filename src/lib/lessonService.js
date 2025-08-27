/**
 * Service pour gérer les leçons depuis la base de données
 * Ce service fonctionne uniquement côté serveur (API routes)
 */
export class LessonService {
  
  /**
   * Récupère toutes les leçons depuis la base de données
   */
  static async getAllLessons() {
    // Vérification côté serveur uniquement
    if (typeof window !== 'undefined') {
      throw new Error('LessonService ne peut être utilisé que côté serveur');
    }

    try {
      const { db } = await import('../../db/drizzle.js');
      const { lessons } = await import('../../db/shema.js');
      
  const result = await db.select().from(lessons).orderBy(lessons.id);
      
      // Transforme les données de la base vers le format attendu par l'application
      return result.map(lesson => ({
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
        },
        expectedBlocks: [
          {
            type: "event_whenflagclicked",
            next: {
              type: "motion_movesteps",
              fields: {
                STEPS: 10
              }
            }
          }
        ]
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des leçons:', error);
      return [];
    }
  }

  /**
   * Récupère une leçon spécifique par son ID
   */
  static async getLesson(id) {
    if (typeof window !== 'undefined') {
      throw new Error('LessonService ne peut être utilisé que côté serveur');
    }

    try {
      const { db } = await import('../../db/drizzle.js');
      const { lessons } = await import('../../db/shema.js');
      const { eq } = await import('drizzle-orm');
      
      const result = await db.select().from(lessons).where(eq(lessons.id, id));
      
      if (result.length === 0) {
        return null;
      }

      const lesson = result[0];
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
        },
        expectedBlocks: [
          {
            type: "event_whenflagclicked",
            next: {
              type: "motion_movesteps",
              fields: {
                STEPS: 10
              }
            }
          }
        ]
      };
    } catch (error) {
      console.error('Erreur lors de la récupération de la leçon:', error);
      return null;
    }
  }

  /**
   * Ajoute une nouvelle leçon
   */
  static async createLesson(titre, step1, step2, step3, step4) {
  // Back-compat signature kept; below we expose an extended method.
    if (typeof window !== 'undefined') {
      throw new Error('LessonService ne peut être utilisé que côté serveur');
    }

    try {
      const { db } = await import('../../db/drizzle.js');
      const { lessons } = await import('../../db/shema.js');
      
      const result = await db.insert(lessons).values({
        titre,
        step1,
        step2,
        step3,
        step4
      }).returning();
      
      return result[0];
    } catch (error) {
      console.error('Erreur lors de la création de la leçon:', error);
      throw error;
    }
  }

  /**
   * Nouvelle création avec concept/preview/toolboxCategories
   */
  static async createLessonWithMeta(titre, concept, preview, step1, step2, step3, step4) {
    if (typeof window !== 'undefined') {
      throw new Error('LessonService ne peut être utilisé que côté serveur');
    }

    try {
      const { db } = await import('../../db/drizzle.js');
      const { lessons } = await import('../../db/shema.js');
      const values = {
        titre,
        concept: concept ?? '',
        preview: preview ?? '',
        step1,
        step2,
        step3,
        step4,
      };
      const result = await db.insert(lessons).values(values).returning();
      return result[0];
    } catch (error) {
      console.error('Erreur lors de la création (meta):', error);
      throw error;
    }
  }

  /**
   * Met à jour une leçon existante
   */
  static async updateLesson(id, titre, step1, step2, step3, step4) {
    if (typeof window !== 'undefined') {
      throw new Error('LessonService ne peut être utilisé que côté serveur');
    }

    try {
      const { db } = await import('../../db/drizzle.js');
      const { lessons } = await import('../../db/shema.js');
      const { eq } = await import('drizzle-orm');
      
      const result = await db.update(lessons)
        .set({
          titre,
          step1,
          step2,
          step3,
          step4
        })
        .where(eq(lessons.id, id))
        .returning();
      
      return result[0];
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la leçon:', error);
      throw error;
    }
  }

  /**
   * Mise à jour étendue avec concept/preview/toolboxCategories
   */
  static async updateLessonWithMeta(id, titre, concept, preview, step1, step2, step3, step4) {
    if (typeof window !== 'undefined') {
      throw new Error('LessonService ne peut être utilisé que côté serveur');
    }

    try {
      const { db } = await import('../../db/drizzle.js');
      const { lessons } = await import('../../db/shema.js');
      const { eq } = await import('drizzle-orm');
      const result = await db.update(lessons)
        .set({
          titre,
          concept: concept ?? '',
          preview: preview ?? '',
          step1,
          step2,
          step3,
          step4,
        })
        .where(eq(lessons.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Erreur lors de la mise à jour (meta):', error);
      throw error;
    }
  }

  /**
   * Supprime une leçon
   */
  static async deleteLesson(id) {
    if (typeof window !== 'undefined') {
      throw new Error('LessonService ne peut être utilisé que côté serveur');
    }

    try {
      const { db } = await import('../../db/drizzle.js');
      const { lessons } = await import('../../db/shema.js');
      const { eq } = await import('drizzle-orm');
      
      await db.delete(lessons).where(eq(lessons.id, id));
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de la leçon:', error);
      throw error;
    }
  }
}
