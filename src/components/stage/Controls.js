'use client';

export default function Controls({ onRun, onStop, isRunning }) {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex items-center space-x-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl rounded-2xl p-3 border border-white/20 dark:border-gray-700/50">
        {/* Green Flag (Run) Button */}
        <button
          onClick={onRun}
          disabled={isRunning}
          className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            isRunning 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300'
          } group`}
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-6 h-6 fill-current transition-transform duration-200 group-hover:scale-110"
          >
            <path d="M8 5v14l11-7z"/>
          </svg>
          {!isRunning && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-xl animate-pulse"></div>
          )}
        </button>

        {/* Stop Button */}
        <button
          onClick={onStop}
          disabled={!isRunning}
          className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            !isRunning 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300'
          } group`}
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-6 h-6 fill-current transition-transform duration-200 group-hover:scale-110"
          >
            <rect x="6" y="6" width="12" height="12" rx="2"/>
          </svg>
          {isRunning && (
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-500/20 rounded-xl animate-pulse"></div>
          )}
        </button>

        {/* Decorative Divider */}
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>

        {/* Status Indicator with Animation */}
        <div className="flex items-center space-x-3 px-2">
          <div className="relative">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              isRunning 
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-200' 
                : 'bg-gradient-to-r from-gray-300 to-gray-400'
            }`}>
              {isRunning && (
                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              )}
            </div>
          </div>
          <div className="text-center">
            <span className={`text-sm font-bold transition-all duration-200 ${
              isRunning 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {isRunning ? 'Running' : 'Ready'}
            </span>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {isRunning ? '⚡ Code Active' : '🎯 Click Play'}
            </div>
          </div>
        </div>

        {/* Floating Action Hint */}
        {!isRunning && (
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium whitespace-nowrap animate-bounce">
              <span className="flex items-center">
                <span className="mr-2">🚀</span>
                Click the green flag to run your code!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Running Animation Overlay */}
      {isRunning && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-200/20 via-blue-200/20 to-purple-200/20 rounded-2xl animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
