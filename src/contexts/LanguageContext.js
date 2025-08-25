'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// Supported languages
export const LANGUAGES = {
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    nativeName: 'Français'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    nativeName: 'English'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    flag: '��',
    nativeName: 'العربية'
  }
};

// Translation strings
const translations = {
  fr: {
    // Interface générale
    'app.title': 'Laboratoire de Codage NextGen',
    'app.subtitle': 'Environnement de Programmation Interactif',
    'welcome': 'Bienvenue dans votre laboratoire de programmation !',
    'getStarted': 'Commencer',
    'translations': 'Traductions',
    
    // Système de leçons
    'lesson': 'Leçon',
    'lessons': 'Leçons',
    'tasks': 'Tâches',
    'step': 'Étape',
    'steps': 'Étapes',
    'currentLesson': 'Leçon Actuelle',
    'lessonProgress': 'Progression de la Leçon',
    'lessonComplete': 'Leçon Terminée !',
    'allLessonsComplete': 'Toutes les leçons terminées !',
    'mastered': 'Vous avez maîtrisé cette leçon parfaitement !',
    'nextLesson': 'Leçon Suivante',
    'previousLesson': 'Leçon Précédente',
    
    // États et statuts
    'ready': 'Prêt',
    'running': 'En cours',
    'completed': 'Terminé',
    'loading': 'Chargement...',
    'error': 'Erreur',
    'success': 'Succès',
    'failed': 'Échec',
    'pending': 'En attente',
    
    // Actions et contrôles
    'run': 'Exécuter',
    'stop': 'Arrêter',
    'reset': 'Réinitialiser',
    'save': 'Sauvegarder',
    'load': 'Charger',
    'delete': 'Supprimer',
    'edit': 'Modifier',
    'copy': 'Copier',
    'paste': 'Coller',
    'undo': 'Annuler',
    'redo': 'Refaire',
    
    // Validation et feedback
    'excellent': 'Excellent travail !',
    'goodJob': 'Bon travail !',
    'almostThere': 'Presque réussi !',
    'tryAgain': 'Essayez encore',
    'taskCompleted': 'Tâche terminée avec succès !',
    'checkWork': 'Vérifier mon travail',
    'nextStep': 'Étape suivante',
    'hint': 'Indice',
    'showHint': 'Montrer l\'indice',
    'hideHint': 'Masquer l\'indice',
    
    // Composants de l'interface
    'codingPlayground': 'Aire de Codage',
    'visualCodeBuilder': 'Constructeur de Code Visuel',
    'dragDropRun': 'Glissez, déposez et exécutez votre code',
    'codeActive': '⚡ Code Actif',
    'clickPlay': '🎯 Cliquez pour jouer',
    'workspace': 'Espace de travail',
    'toolbox': 'Boîte à outils',
    'blocks': 'Blocs',
    'code': 'Code',
    'output': 'Sortie',
    'console': 'Console',
    
    // Instructions et aide
    'instructions': 'Instructions',
    'objective': 'Objectif',
    'requirements': 'Exigences',
    'lookForBlock': 'Cherchez ce bloc :',
    'dragToWorkspace': 'Glissez ce bloc dans votre espace de travail',
    'connectBlocks': 'Connectez les blocs ensemble',
    'clickToRun': 'Cliquez sur le bouton vert pour exécuter !',
    'followSteps': 'Suivez les étapes ci-dessous',
    'completeTasks': 'Complétez toutes les tâches pour continuer',
    
    // Catégories de blocs
    'allCategories': 'Toutes les Catégories',
    'logic': 'Logique',
    'loops': 'Boucles',
    'math': 'Mathématiques',
    'text': 'Texte',
    'lists': 'Listes',
    'colour': 'Couleur',
    'variables': 'Variables',
    'functions': 'Fonctions',
    'events': 'Événements',
    'control': 'Contrôle',
    
    // Messages système
    'browserNotSupported': 'Votre navigateur ne prend pas en charge cette fonctionnalité',
    'loadingResources': 'Chargement des ressources...',
    'savingProgress': 'Sauvegarde du progrès...',
    'connectionError': 'Erreur de connexion',
    'retryConnection': 'Réessayer la connexion',
    
    // Navigation
    'home': 'Accueil',
    'dashboard': 'Tableau de bord',
    'profile': 'Profil',
    'settings': 'Paramètres',
    'help': 'Aide',
    'about': 'À propos',
    'contact': 'Contact',
    'back': 'Retour',
    'next': 'Suivant',
    'previous': 'Précédent',
    'close': 'Fermer',
    'open': 'Ouvrir',
    'minimize': 'Réduire',
    'maximize': 'Agrandir'
  },
  
  en: {
    // General Interface
    'app.title': 'NextGen Coding Lab',
    'app.subtitle': 'Interactive Programming Environment',
    'welcome': 'Welcome to your coding laboratory!',
    'getStarted': 'Get Started',
    'translations': 'Translations',
    
    // Lesson System
    'lesson': 'Lesson',
    'lessons': 'Lessons',
    'tasks': 'Tasks',
    'step': 'Step',
    'steps': 'Steps',
    'currentLesson': 'Current Lesson',
    'lessonProgress': 'Lesson Progress',
    'lessonComplete': 'Lesson Complete!',
    'allLessonsComplete': 'All lessons completed!',
    'mastered': 'You\'ve mastered this lesson perfectly!',
    'nextLesson': 'Next Lesson',
    'previousLesson': 'Previous Lesson',
    
    // States and Status
    'ready': 'Ready',
    'running': 'Running',
    'completed': 'Completed',
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    'failed': 'Failed',
    'pending': 'Pending',
    
    // Actions and Controls
    'run': 'Run',
    'stop': 'Stop',
    'reset': 'Reset',
    'save': 'Save',
    'load': 'Load',
    'delete': 'Delete',
    'edit': 'Edit',
    'copy': 'Copy',
    'paste': 'Paste',
    'undo': 'Undo',
    'redo': 'Redo',
    
    // Validation and Feedback
    'excellent': 'Excellent work!',
    'goodJob': 'Good job!',
    'almostThere': 'Almost there!',
    'tryAgain': 'Try again',
    'taskCompleted': 'Task completed successfully!',
    'checkWork': 'Check My Work',
    'nextStep': 'Next Step',
    'hint': 'Hint',
    'showHint': 'Show Hint',
    'hideHint': 'Hide Hint',
    
    // Interface Components
    'codingPlayground': 'Coding Playground',
    'visualCodeBuilder': 'Visual Code Builder',
    'dragDropRun': 'Drag, drop, and run your code',
    'codeActive': '⚡ Code Active',
    'clickPlay': '🎯 Click Play',
    'workspace': 'Workspace',
    'toolbox': 'Toolbox',
    'blocks': 'Blocks',
    'code': 'Code',
    'output': 'Output',
    'console': 'Console',
    
    // Instructions and Help
    'instructions': 'Instructions',
    'objective': 'Objective',
    'requirements': 'Requirements',
    'lookForBlock': 'Look for this block:',
    'dragToWorkspace': 'Drag this block to your workspace',
    'connectBlocks': 'Connect the blocks together',
    'clickToRun': 'Click the green button to run!',
    'followSteps': 'Follow the steps below',
    'completeTasks': 'Complete all tasks to continue',
    
    // Block Categories
    'allCategories': 'All Categories',
    'logic': 'Logic',
    'loops': 'Loops',
    'math': 'Math',
    'text': 'Text',
    'lists': 'Lists',
    'colour': 'Colour',
    'variables': 'Variables',
    'functions': 'Functions',
    'events': 'Events',
    'control': 'Control',
    
    // System Messages
    'browserNotSupported': 'Your browser doesn\'t support this feature',
    'loadingResources': 'Loading resources...',
    'savingProgress': 'Saving progress...',
    'connectionError': 'Connection error',
    'retryConnection': 'Retry connection',
    
    // Navigation
    'home': 'Home',
    'dashboard': 'Dashboard',
    'profile': 'Profile',
    'settings': 'Settings',
    'help': 'Help',
    'about': 'About',
    'contact': 'Contact',
    'back': 'Back',
    'next': 'Next',
    'previous': 'Previous',
    'close': 'Close',
    'open': 'Open',
    'minimize': 'Minimize',
    'maximize': 'Maximize'
  },
  
  ar: {
    // الواجهة العامة
    'app.title': 'مختبر البرمجة الحديث',
    'app.subtitle': 'بيئة البرمجة التفاعلية',
    'welcome': 'مرحباً بك في مختبر البرمجة الخاص بك!',
    'getStarted': 'ابدأ الآن',
    'translations': 'الترجمات',
    
    // نظام الدروس
    'lesson': 'درس',
    'lessons': 'الدروس',
    'tasks': 'المهام',
    'step': 'خطوة',
    'steps': 'الخطوات',
    'currentLesson': 'الدرس الحالي',
    'lessonProgress': 'تقدم الدرس',
    'lessonComplete': 'تم إكمال الدرس!',
    'allLessonsComplete': 'تم إكمال جميع الدروس!',
    'mastered': 'لقد أتقنت هذا الدرس بشكل مثالي!',
    'nextLesson': 'الدرس التالي',
    'previousLesson': 'الدرس السابق',
    
    // الحالات والأوضاع
    'ready': 'جاهز',
    'running': 'قيد التشغيل',
    'completed': 'مكتمل',
    'loading': 'جارٍ التحميل...',
    'error': 'خطأ',
    'success': 'نجح',
    'failed': 'فشل',
    'pending': 'في الانتظار',
    
    // الإجراءات والتحكم
    'run': 'تشغيل',
    'stop': 'إيقاف',
    'reset': 'إعادة تعيين',
    'save': 'حفظ',
    'load': 'تحميل',
    'delete': 'حذف',
    'edit': 'تعديل',
    'copy': 'نسخ',
    'paste': 'لصق',
    'undo': 'تراجع',
    'redo': 'إعادة',
    
    // التحقق والتعليقات
    'excellent': 'عمل ممتاز!',
    'goodJob': 'أحسنت!',
    'almostThere': 'أوشكت على الانتهاء!',
    'tryAgain': 'حاول مرة أخرى',
    'taskCompleted': 'تم إكمال المهمة بنجاح!',
    'checkWork': 'فحص عملي',
    'nextStep': 'الخطوة التالية',
    'hint': 'تلميح',
    'showHint': 'إظهار التلميح',
    'hideHint': 'إخفاء التلميح',
    
    // مكونات الواجهة
    'codingPlayground': 'ساحة البرمجة',
    'visualCodeBuilder': 'منشئ الكود المرئي',
    'dragDropRun': 'اسحب وأسقط وشغّل الكود الخاص بك',
    'codeActive': '⚡ الكود نشط',
    'clickPlay': '🎯 انقر للتشغيل',
    'workspace': 'مساحة العمل',
    'toolbox': 'صندوق الأدوات',
    'blocks': 'الكتل',
    'code': 'الكود',
    'output': 'المخرجات',
    'console': 'وحدة التحكم',
    
    // التعليمات والمساعدة
    'instructions': 'التعليمات',
    'objective': 'الهدف',
    'requirements': 'المتطلبات',
    'lookForBlock': 'ابحث عن هذه الكتلة:',
    'dragToWorkspace': 'اسحب هذه الكتلة إلى مساحة العمل',
    'connectBlocks': 'اربط الكتل معاً',
    'clickToRun': 'انقر على الزر الأخضر للتشغيل!',
    'followSteps': 'اتبع الخطوات أدناه',
    'completeTasks': 'أكمل جميع المهام للمتابعة',
    
    // فئات الكتل
    'allCategories': 'جميع الفئات',
    'logic': 'المنطق',
    'loops': 'الحلقات',
    'math': 'الرياضيات',
    'text': 'النص',
    'lists': 'القوائم',
    'colour': 'الألوان',
    'variables': 'المتغيرات',
    'functions': 'الدوال',
    'events': 'الأحداث',
    'control': 'التحكم',
    
    // رسائل النظام
    'browserNotSupported': 'متصفحك لا يدعم هذه الميزة',
    'loadingResources': 'جارٍ تحميل الموارد...',
    'savingProgress': 'جارٍ حفظ التقدم...',
    'connectionError': 'خطأ في الاتصال',
    'retryConnection': 'إعادة محاولة الاتصال',
    
    // التنقل
    'home': 'الرئيسية',
    'dashboard': 'لوحة القيادة',
    'profile': 'الملف الشخصي',
    'settings': 'الإعدادات',
    'help': 'المساعدة',
    'about': 'حول',
    'contact': 'اتصل بنا',
    'back': 'رجوع',
    'next': 'التالي',
    'previous': 'السابق',
    'close': 'إغلاق',
    'open': 'فتح',
    'minimize': 'تصغير',
    'maximize': 'تكبير'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('fr'); // Default language

  // Load saved language from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('nextgen-lab-language');
      if (savedLanguage && LANGUAGES[savedLanguage]) {
        setLanguage(savedLanguage);
        // Apply RTL for Arabic
        const htmlElement = document.documentElement;
        if (savedLanguage === 'ar') {
          htmlElement.setAttribute('dir', 'rtl');
          htmlElement.setAttribute('lang', 'ar');
        } else {
          htmlElement.setAttribute('dir', 'ltr');
          htmlElement.setAttribute('lang', savedLanguage);
        }
      }
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nextgen-lab-language', language);
      // Apply RTL direction for Arabic
      const htmlElement = document.documentElement;
      if (language === 'ar') {
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.setAttribute('lang', 'ar');
      } else {
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.setAttribute('lang', language);
      }
    }
  }, [language]);

  const setLanguageAndSave = (newLanguage) => {
    if (LANGUAGES[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  const toggleLanguage = () => {
    const languageKeys = Object.keys(LANGUAGES);
    const currentIndex = languageKeys.indexOf(language);
    const nextIndex = (currentIndex + 1) % languageKeys.length;
    setLanguageAndSave(languageKeys[nextIndex]);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.fr[key] || key;
  };

  const getCurrentLanguage = () => {
    return LANGUAGES[language];
  };

  const value = {
    language,
    setLanguage: setLanguageAndSave,
    toggleLanguage,
    t,
    currentLanguage: getCurrentLanguage(),
    languages: LANGUAGES
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
