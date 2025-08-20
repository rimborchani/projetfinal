'use client';

import { useState } from 'react';
import GuidePanel from './panels/GuidePanel';
import PlaygroundPanel from './panels/PlaygroundPanel';
import { lessons } from '../lib/lessons';

export default function InteractiveLab() {
  // Safety check to ensure lessons array exists and has content
  const initialLesson = lessons && lessons.length > 0 ? lessons[0] : null;
  const [currentLesson, setCurrentLesson] = useState(initialLesson);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [workspace, setWorkspace] = useState(null);

  // If no lessons available, show error message
  if (!initialLesson) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-red-600 mb-4">Erreur</h1>
          <p>Aucune leçon n'est disponible pour le moment.</p>
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

  const handleLessonChange = (lessonId) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      setCurrentLesson(lesson);
      setCompletedTasks([]); // Reset progress for new lesson
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm animate-pulse">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-wide">
                  مختبر البرمجة التفاعلي - NextGenCoding
                </h1>
                <p className="text-indigo-100 text-sm flex items-center gap-2">
                  <span>🧩</span> تعلم البرمجة بالكتل المرئية
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">{/* Progress Ring */}
              <div className="relative">
                <div className="w-12 h-12">
                  <svg className="transform -rotate-90 w-12 h-12">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="4"
                      fill="transparent"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={`${(completedTasks.length / (currentLesson?.tasks?.length || 1)) * 125.6} 125.6`}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {Math.round((completedTasks.length / (currentLesson?.tasks?.length || 1)) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Lesson Selector */}
              <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20 shadow-lg">
                <span className="text-sm font-medium text-white flex items-center gap-2">
                  <span>📚</span> الدرس:
                </span>
                <select 
                  value={currentLesson.id}
                  onChange={(e) => handleLessonChange(parseInt(e.target.value))}
                  className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white text-sm font-medium placeholder-white/70 focus:bg-gradient-to-r focus:from-white/30 focus:to-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 transition-all duration-300 cursor-pointer hover:bg-gradient-to-r hover:from-white/25 hover:to-white/15"
                  style={{
                    minWidth: '200px',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {lessons.map(lesson => (
                    <option key={lesson.id} value={lesson.id} className="text-gray-800 bg-white font-medium">
                      {lesson.id}. {lesson.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 bg-white/20 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 via-green-400 to-emerald-500 transition-all duration-700 ease-out relative"
            style={{ width: `${(completedTasks.length / (currentLesson?.tasks?.length || 1)) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
          <div className="absolute right-2 top-0 bottom-0 flex items-center">
            <span className="text-xs font-bold text-white/80 drop-shadow-lg">
              {completedTasks.length}/{currentLesson?.tasks?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 gap-4 p-4">
        {/* Left Panel - Guide */}
        <div className="w-full md:w-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <GuidePanel 
              lesson={currentLesson}
              completedTasks={completedTasks}
              onTaskComplete={handleTaskComplete}
              workspace={workspace}
            />
          </div>
        </div>
        
        {/* Right Panel - Playground */}
        <div className="w-full md:w-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
          <PlaygroundPanel 
            lesson={currentLesson}
            onWorkspaceChange={handleWorkspaceChange}
          />
        </div>
      </div>
    </div>
  );
}
