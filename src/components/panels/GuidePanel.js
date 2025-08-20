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

  const validateBlocks = (blocks, task) => {
    // Simple validation logic - in a real app, this would be more sophisticated
    const blockTypes = blocks.map(block => block.type);
    return blockTypes.includes(task.blockType);
  };

  return (
    <div className="p-6 h-full flex flex-col text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">{lesson.id}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {lesson.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Interactive Learning Experience</p>
          </div>
        </div>
        
        {/* Progress Dots */}
        <div className="flex items-center space-x-3">
          {lesson.tasks.map((task, index) => (
            <div key={task.id} className="flex items-center">
              <div
                className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                  completedTasks.includes(task.id)
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-200'
                    : index === currentTaskIndex
                    ? 'bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg shadow-blue-200 animate-pulse'
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                {completedTasks.includes(task.id) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              {index < lesson.tasks.length - 1 && (
                <div className={`w-8 h-0.5 mx-1 transition-all duration-300 ${
                  completedTasks.includes(task.id) ? 'bg-green-300' : 'bg-gray-200 dark:bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Concept Explanation */}
      <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/30 rounded-2xl border border-blue-200/50 dark:border-blue-500/30 shadow-lg">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-white text-lg">💡</span>
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              What You'll Learn
            </h2>
            <p className="text-blue-700 dark:text-blue-200 leading-relaxed">{lesson.concept}</p>
          </div>
        </div>
      </div>

      {/* Current Task */}
      <div className="flex-1">
        <div key={currentTask.id} className="mb-6">
          <div className="flex items-start space-x-4">
            <div className={`relative flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 ${
              isTaskCompleted 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-200' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-blue-200'
            }`}>
              {isTaskCompleted ? (
                <span className="animate-bounce">✓</span>
              ) : (
                <span>{currentTaskIndex + 1}</span>
              )}
            </div>
            
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Step {currentTaskIndex + 1}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-base">{currentTask.instruction}</p>
              </div>
              
              {/* Visual Block Example */}
              {currentTask.blockImage && (
                <div className="mb-4 p-4 bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/30 rounded-xl border-2 border-dashed border-yellow-300 dark:border-yellow-500/50 shadow-inner">
                  <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                    <span className="mr-2">👀</span>
                    Look for this block:
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                      <span className="text-xs text-center">Block<br/>Preview</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800 dark:text-gray-200">{currentTask.category} Category</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Drag this block to your workspace</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Hint */}
              {currentTask.hint && (
                <div className="mb-4 p-4 bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/30 rounded-xl border-l-4 border-yellow-400 dark:border-yellow-500 shadow-md">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">💡</span>
                    </div>
                    <div>
                      <p className="font-semibold text-yellow-800 dark:text-yellow-200 text-sm mb-1">Hint:</p>
                      <p className="text-yellow-700 dark:text-yellow-100 text-sm">{currentTask.hint}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Success Message */}
        {isTaskCompleted && (
          <div className="mb-6 p-5 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30 rounded-2xl border border-green-200 dark:border-green-700/50 shadow-lg transform animate-fadeIn">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md animate-bounce">
                <span className="text-white text-lg">🎉</span>
              </div>
              <div>
                <p className="text-green-800 dark:text-green-200 font-bold text-lg">Excellent work!</p>
                <p className="text-green-600 dark:text-green-300 text-sm">Task completed successfully!</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
        {!isTaskCompleted ? (
          <Button
            onClick={handleCheckWork}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={!workspace}
          >
            <span className="flex items-center justify-center">
              <span className="mr-2">🔍</span>
              Check My Work
            </span>
          </Button>
        ) : currentTaskIndex < lesson.tasks.length - 1 ? (
          <Button
            onClick={handleNextTask}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center justify-center">
              Next Step
              <span className="ml-2">→</span>
            </span>
          </Button>
        ) : allTasksCompleted ? (
          <div className="text-center">
            <div className="mb-6 p-6 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/30 rounded-2xl border border-purple-200 dark:border-purple-700/50 shadow-lg">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Lesson Complete!
              </h3>
              <p className="text-purple-700 dark:text-purple-200">You've mastered this lesson perfectly!</p>
            </div>
            <Button
              onClick={() => {/* Navigate to next lesson */}}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">🚀</span>
                Next Lesson
                <span className="ml-2">→</span>
              </span>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
