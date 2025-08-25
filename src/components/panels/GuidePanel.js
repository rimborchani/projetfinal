'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import { validateTaskCompletion, getHint } from '../../lib/validation';

export default function GuidePanel({ lesson, completedTasks, onTaskComplete, workspace }) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [validationMessage, setValidationMessage] = useState('');
  
  // Safety check to ensure lesson and tasks exist
  if (!lesson || !lesson.tasks || lesson.tasks.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <p>Aucune leçon disponible</p>
      </div>
    );
  }
  
  const currentTask = lesson.tasks[currentTaskIndex];
  
  // Another safety check for currentTask
  if (!currentTask) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <p>Tâche non trouvée</p>
      </div>
    );
  }
  
  const isTaskCompleted = completedTasks.includes(currentTask.id);
  const allTasksCompleted = lesson.tasks.every(task => completedTasks.includes(task.id));

  const handleNextTask = () => {
    if (currentTaskIndex < lesson.tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  };

  const handleCheckWork = () => {
    // Validate workspace blocks
    if (workspace) {
      const validation = validateTaskCompletion(workspace, currentTask);
      
      if (validation.isValid) {
        onTaskComplete(currentTask.id);
        
        // Auto-advance to next task after a delay
        setTimeout(() => {
          if (currentTaskIndex < lesson.tasks.length - 1) {
            handleNextTask();
          }
        }, 1500);
      } else {
        // Show validation message (you could add a state for this)
        alert(validation.message);
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      {/* Modern Professional Header */}
      <div className="p-6 border-b border-blue-200/50 dark:border-emerald-700/50 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">{lesson.id}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-emerald-700 bg-clip-text text-transparent">
              {lesson.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {lesson.concept}
            </p>
          </div>
        </div>
        
        {/* Enhanced Progress Dots */}
        <div className="flex items-center justify-center space-x-3">
          {lesson.tasks.map((task, index) => (
            <div key={task.id} className="flex items-center">
              <div className="relative">
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-500 ${
                    completedTasks.includes(task.id)
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 shadow-lg scale-110'
                      : index === currentTaskIndex
                      ? 'bg-gradient-to-r from-blue-500 to-emerald-500 animate-pulse shadow-lg scale-105'
                      : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                  }`}
                />
                {completedTasks.includes(task.id) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              {index < lesson.tasks.length - 1 && (
                <div className={`w-8 h-1 mx-2 transition-all duration-500 rounded-full ${
                  completedTasks.includes(task.id) ? 'bg-gradient-to-r from-emerald-400 to-blue-400' : 'bg-slate-200 dark:bg-slate-600'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Content Area with Modern Cards */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Current Task */}
        <div className="mb-8">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 dark:border-emerald-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-start space-x-5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-lg transition-all duration-500 ${
                isTaskCompleted 
                  ? 'bg-gradient-to-br from-emerald-500 to-blue-500' 
                  : 'bg-gradient-to-br from-blue-500 to-emerald-500 animate-pulse'
              }`}>
                {isTaskCompleted ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span>{currentTaskIndex + 1}</span>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-emerald-700 bg-clip-text text-transparent mb-3">
                  Step {currentTaskIndex + 1}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                  {currentTask.instruction}
                </p>
              </div>
            </div>
          </div>
        </div>
              
        {/* Visual Block Example */}
        {currentTask.blockImage && (
          <div className="mb-8 bg-gradient-to-br from-amber-50/80 to-yellow-100/80 dark:from-amber-900/20 dark:to-yellow-900/20 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 dark:border-amber-700/50 shadow-lg">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-4 flex items-center">
              <span className="mr-3 text-lg">👀</span>
              Look for this block:
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-lg">
                Block
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                  {currentTask.category} Category
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Drag this block to your workspace
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hint */}
        {currentTask.hint && (
          <div className="mb-8 bg-gradient-to-br from-blue-50/80 to-indigo-100/80 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-blue-400 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white text-sm">💡</span>
              </div>
              <div>
                <p className="font-semibold text-blue-800 dark:text-blue-200 text-sm mb-2">
                  Hint:
                </p>
                <p className="text-blue-700 dark:text-blue-100 text-sm leading-relaxed">
                  {currentTask.hint}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {isTaskCompleted && (
          <div className="mb-8 bg-gradient-to-br from-emerald-50/80 to-green-100/80 dark:from-emerald-900/20 dark:to-green-900/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200 dark:border-emerald-700/50 shadow-lg animate-fadeIn">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-white text-xl">🎉</span>
              </div>
              <div>
                <p className="text-emerald-800 dark:text-emerald-200 font-bold text-lg">
                  Excellent work!
                </p>
                <p className="text-emerald-600 dark:text-emerald-300 text-sm">
                  Task completed successfully!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modern Action Buttons */}
      <div className="p-6 border-t border-blue-200/50 dark:border-emerald-700/50 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
        {!isTaskCompleted ? (
          <button
            onClick={handleCheckWork}
            className="btn-primary w-full relative overflow-hidden"
            disabled={!workspace}
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-3 text-lg">🔍</span>
              Check My Work
            </span>
          </button>
        ) : currentTaskIndex < lesson.tasks.length - 1 ? (
          <button
            onClick={handleNextTask}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center justify-center">
              Next Step
              <span className="ml-3 text-lg">→</span>
            </span>
          </button>
        ) : allTasksCompleted ? (
          <div className="text-center">
            <div className="mb-6 bg-gradient-to-br from-purple-50/80 to-pink-100/80 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 dark:border-purple-700/50 shadow-lg">
              <div className="text-5xl mb-4 animate-bounce">🎉</div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Lesson Complete!
              </h3>
              <p className="text-purple-600 dark:text-purple-400">
                You've mastered this lesson perfectly!
              </p>
            </div>
            <button
              onClick={() => {/* Navigate to next lesson */}}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center">
                <span className="mr-3 text-lg">🚀</span>
                Next Lesson
                <span className="ml-3 text-lg">→</span>
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
