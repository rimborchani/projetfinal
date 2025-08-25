'use client';

export default function Controls({ onRun, onStop, isRunning }) {
  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex items-center space-x-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-xl rounded-2xl p-4 border border-blue-200/50 dark:border-emerald-700/50">
        {/* Modern Run Button */}
        <button
          onClick={onRun}
          disabled={isRunning}
          className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
            isRunning 
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-700' 
              : 'bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-emerald-200 hover:shadow-xl'
          }`}
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-7 h-7 fill-current transition-transform duration-200"
          >
            <path d="M8 5v14l11-7z"/>
          </svg>
          {!isRunning && (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/30 to-green-500/30 rounded-xl animate-pulse"></div>
          )}
        </button>

        {/* Modern Stop Button */}
        <button
          onClick={onStop}
          disabled={!isRunning}
          className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
            !isRunning 
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-700' 
              : 'bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-red-200 hover:shadow-xl'
          }`}
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-7 h-7 fill-current transition-transform duration-200"
          >
            <rect x="6" y="6" width="12" height="12" rx="2"/>
          </svg>
          {isRunning && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-300/30 to-pink-500/30 rounded-xl animate-pulse"></div>
          )}
        </button>

        {/* Modern Status Indicator */}
        <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-600">
          <div className="relative">
            <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
              isRunning 
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg' 
                : 'bg-slate-400'
            }`}>
              {isRunning && (
                <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
              )}
            </div>
          </div>
          <div>
            <span className={`text-sm font-semibold transition-all duration-300 ${
              isRunning 
                ? 'text-emerald-700 dark:text-emerald-300' 
                : 'text-slate-600 dark:text-slate-400'
            }`}>
              {isRunning ? 'Running' : 'Ready'}
            </span>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isRunning ? '⚡ Code Active' : '🎯 Click Play'}
            </div>
          </div>
        </div>

        {/* Interactive Hint */}
        {!isRunning && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium whitespace-nowrap animate-bounce">
              <span className="flex items-center">
                <span className="mr-2">🚀</span>
                Click the green flag to run!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Running Effect */}
      {isRunning && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-200/20 via-blue-200/20 to-green-200/20 rounded-2xl animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
