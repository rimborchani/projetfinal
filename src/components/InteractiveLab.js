'use client';

import { useState, useEffect } from 'react';
import GuidePanel from './panels/GuidePanel';
import PlaygroundPanel from './panels/PlaygroundPanel';
import ForceBlocklyStyles from './ForceBlocklyStyles';
import { getAllLessons, getLesson } from '../lib/lessonsDB';

export default function InteractiveLab() {
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [workspace, setWorkspace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les leçons au démarrage
  useEffect(() => {
    const loadLessons = async () => {
      try {
        setIsLoading(true);
        const fetchedLessons = await getAllLessons();
        setLessons(fetchedLessons);
        
        // Définir la première leçon comme leçon courante
        if (fetchedLessons && fetchedLessons.length > 0) {
          setCurrentLesson(fetchedLessons[0]);
        }
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des leçons:', err);
        setError('Impossible de charger les leçons');
      } finally {
        setIsLoading(false);
      }
    };

    loadLessons();
  }, []);

  // Affichage de chargement
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-bold text-blue-600 mb-2">Chargement...</h1>
          <p>Récupération des leçons depuis la base de données...</p>
        </div>
      </div>
    );
  }

  // Affichage d'erreur
  if (error || !lessons || lessons.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-red-600 mb-4">Erreur</h1>
          <p>{error || "Aucune leçon n'est disponible pour le moment."}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const handleTaskComplete = (taskId) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  const handleWorkspaceChange = (workspaceInstance) => {
    setWorkspace(workspaceInstance);
  };

  const handleLessonChange = async (lessonId) => {
    try {
      const lesson = await getLesson(lessonId);
      if (lesson) {
        setCurrentLesson(lesson);
        setCompletedTasks([]); // Reset progress for new lesson
      }
    } catch (error) {
      console.error('Erreur lors du changement de leçon:', error);
      // Fallback vers la recherche locale
      const fallbackLesson = lessons.find(l => l.id === lessonId);
      if (fallbackLesson) {
        setCurrentLesson(fallbackLesson);
        setCompletedTasks([]);
      }
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-blue-950 dark:to-emerald-950">
      <ForceBlocklyStyles />
      
      {/* Header Professionnel avec Logo, Leçons et Progression */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-emerald-500/10"></div>
        <header className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-blue-200/50 dark:border-emerald-700/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo et Titre */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">🎯</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-emerald-700 bg-clip-text text-transparent">
                    NextGen Coding Lab
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                    Environnement de Programmation Interactive
                  </p>
                </div>
              </div>
              
              {/* Progression et Contrôles */}
              <div className="flex items-center space-x-6">
                {/* Lien Admin */}
                <a 
                  href="/admin/lessons" 
                  className="hidden md:flex items-center space-x-2 bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-blue-200/50 dark:border-emerald-700/50 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-600"
                >
                  <span>⚙️</span>
                  <span>Admin</span>
                </a>
                
                {/* Indicateur de Progression Moderne */}
                <div className="hidden md:flex items-center space-x-4 bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-2xl px-6 py-3 border border-blue-200/50 dark:border-emerald-700/50 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 animate-pulse"></div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {completedTasks.length}/{currentLesson?.tasks?.length || 0} Tâches
                    </span>
                  </div>
                  
                  {/* Barre de Progression Améliorée */}
                  <div className="w-32 h-3 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-700 ease-out shadow-lg"
                      style={{ width: `${(completedTasks.length / (currentLesson?.tasks?.length || 1)) * 100}%` }}
                    />
                  </div>
                  
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {Math.round((completedTasks.length / (currentLesson?.tasks?.length || 1)) * 100)}%
                  </div>
                </div>
                
                {/* Sélecteur de Leçons Moderne */}
                <div className="relative">
                  <select 
                    value={currentLesson?.id || ''}
                    onChange={(e) => handleLessonChange(parseInt(e.target.value))}
                    className="appearance-none bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border-2 border-blue-200 dark:border-emerald-700 rounded-xl px-6 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-emerald-500 focus:border-transparent shadow-lg transition-all duration-300 hover:shadow-xl min-w-[200px]"
                  >
                    {lessons.map(lesson => (
                      <option key={lesson.id} value={lesson.id} className="bg-white dark:bg-slate-800">
                        Leçon {lesson.id}: {lesson.title.substring(0, 25)}...
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Layout Split Moderne */}
      <div className="flex-1 flex overflow-hidden">
        {/* Panneau Gauche - Instructions */}
        <div className="w-1/2 bg-gradient-to-br from-white/90 to-blue-50/50 dark:from-slate-800/90 dark:to-blue-950/50 backdrop-blur-sm border-r border-blue-200/50 dark:border-emerald-700/50">
          <GuidePanel 
            lesson={currentLesson}
            completedTasks={completedTasks}
            onTaskComplete={handleTaskComplete}
            workspace={workspace}
          />
        </div>
        
        {/* Panneau Droit - Espace de Codage */}
        <div className="w-1/2 bg-gradient-to-br from-slate-50/90 to-emerald-50/50 dark:from-slate-900/90 dark:to-emerald-950/50 backdrop-blur-sm">
          <PlaygroundPanel 
            lesson={currentLesson}
            onWorkspaceChange={handleWorkspaceChange}
          />
        </div>
      </div>
    </div>
  );
}
