import { LessonClient } from './lessonClient';

// Leçons par défaut au cas où la base de données n'est pas accessible
const defaultLessons = [
  {
    id: 1,
    title: "Making Characters Move",
    concept: "Today, we'll learn how to make our character move! We will use Event blocks to start an action and Motion blocks to create movement.",
    tasks: [
      {
        id: 1,
        instruction: "First, find the 'when green flag clicked' block in the Events category and drag it into the workspace on the right.",
        blockType: "event_whenflagclicked",
        category: "Events",
        blockImage: "/blocks/when-flag-clicked.png",
        hint: "Look for the green flag icon in the Events section!"
      },
      {
        id: 2,
        instruction: "Great! Now, find the 'move 10 steps' block in the Motion category and connect it below the first block.",
        blockType: "motion_movesteps",
        category: "Motion",
        blockImage: "/blocks/move-steps.png",
        hint: "Motion blocks are blue and control how sprites move around."
      },
      {
        id: 3,
        instruction: "Perfect! Click the green flag above the stage to see your character move!",
        blockType: "complete",
        category: "Control",
        blockImage: "/blocks/green-flag.png",
        hint: "The green flag runs your code - just like pressing play!"
      }
    ],
    toolboxCategories: ["Events", "Motion"],
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
  }
];

// Cache pour les leçons
let lessonsCache = null;
let cacheExpiry = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Récupère toutes les leçons (depuis la base de données ou le cache)
 */
export const getAllLessons = async () => {
  // Vérifier le cache
  const now = Date.now();
  if (lessonsCache && cacheExpiry && now < cacheExpiry) {
    return lessonsCache;
  }

  try {
    // Essayer de récupérer depuis l'API
    const dbLessons = await LessonClient.getAllLessons();
    
    if (dbLessons && dbLessons.length > 0) {
      // Mettre en cache les résultats
      lessonsCache = dbLessons;
      cacheExpiry = now + CACHE_DURATION;
      return dbLessons;
    } else {
      // Retourner les leçons par défaut si aucune n'est trouvée en base
      console.log('Aucune leçon trouvée en base de données, utilisation des leçons par défaut');
      lessonsCache = defaultLessons;
      cacheExpiry = now + CACHE_DURATION;
      return defaultLessons;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des leçons, utilisation des leçons par défaut:', error);
    lessonsCache = defaultLessons;
    cacheExpiry = now + CACHE_DURATION;
    return defaultLessons;
  }
};

/**
 * Récupère une leçon spécifique par son ID
 */
export const getLesson = async (id) => {
  try {
    console.log('🔍 Recherche de la leçon avec ID:', id);
    // Essayer d'abord depuis l'API
    const dbLesson = await LessonClient.getLesson(id);
    if (dbLesson) {
      console.log('✅ Leçon trouvée via API:', dbLesson.title || dbLesson.titre);
      return dbLesson;
    }
    
    // Fallback vers les leçons par défaut ou celles en mémoire
    console.log('🔄 Recherche dans les leçons par défaut...');
    let foundLesson = defaultLessons.find(lesson => lesson.id === id);
    
    // Si pas trouvée dans les défaut, essayer de récupérer toutes les leçons et chercher dedans
    if (!foundLesson) {
      console.log('🔄 Récupération de toutes les leçons pour recherche...');
      const allLessons = await getAllLessons();
      foundLesson = allLessons.find(lesson => lesson.id === id);
    }
    
    if (foundLesson) {
      console.log('✅ Leçon trouvée dans fallback:', foundLesson.title || foundLesson.titre);
      return foundLesson;
    }
    
    console.log('❌ Leçon avec ID', id, 'introuvable');
    return null;
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de la leçon, utilisation du fallback:', error);
    const foundLesson = defaultLessons.find(lesson => lesson.id === id);
    if (foundLesson) {
      console.log('✅ Leçon trouvée dans fallback d\'urgence:', foundLesson.title);
      return foundLesson;
    }
    return null;
  }
};

/**
 * Version synchrone pour compatibilité arrière
 */
export const lessons = defaultLessons;

/**
 * Force le rechargement du cache
 */
export const refreshLessonsCache = () => {
  lessonsCache = null;
  cacheExpiry = null;
};
