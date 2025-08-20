'use client';

import ChatStage from './ChatStage';

export default function Stage({ 
  sprite, 
  position = { x: 0, y: 0 }, 
  rotation = 0, 
  speechBubble = '', 
  isRunning, 
  stageType = 'normal' // 'normal', 'chat'
}) {
  
  // If this is a chat stage, render the chat interface
  if (stageType === 'chat') {
    return <ChatStage />;
  }

  // Default stage rendering
  return (
  <div className="w-full h-full bg-gradient-to-br from-sky-300 via-blue-200 to-indigo-300 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
       {/* Animated Background Shapes */}
       <div className="absolute inset-0 overflow-hidden">
         <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/30 rounded-full animate-float"></div>
         <div className="absolute top-20 right-16 w-16 h-16 bg-pink-300/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
         <div className="absolute bottom-16 left-20 w-12 h-12 bg-green-300/30 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
         <div className="absolute bottom-10 right-10 w-14 h-14 bg-purple-300/30 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
       </div>
       
       {/* Stage Grid with Gradient */}
       <div className="absolute inset-0 opacity-20">
         <svg width="100%" height="100%">
           <defs>
             <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
               <path d="M 20 0 L 0 0 0 20" fill="none" stroke="url(#gridGradient)" strokeWidth="1"/>
             </pattern>
             <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8"/>
               <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.8"/>
             </linearGradient>
           </defs>
           <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>
       </div>       

       {/* Center Lines with Glow */}
       <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-lg shadow-indigo-200"></div>
       <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-indigo-400 to-transparent shadow-lg shadow-indigo-200"></div>      

    {/* Sprite */}
    <div
        className="absolute top-1/2 left-1/2 w-16 h-16 flex items-center justify-center transition-all duration-300 transform-gpu"
        style={{
      transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) rotate(${rotation}deg) ${isRunning ? 'scale(1.1)' : 'scale(1)'}`
        }}
      >
        {/* Simple cat sprite with enhanced colors */}
        <div className="relative">
          {/* Cat body with gradient */}
      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 rounded-full relative shadow-lg shadow-orange-200 dark:shadow-none">
            {/* Animated glow when running */}
            {isRunning && (
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full animate-pulse opacity-75"></div>
            )}
            
            {/* Cat ears with gradient */}
            <div className="absolute -top-2 left-2 w-3 h-4 bg-gradient-to-br from-orange-400 to-amber-500 rounded-t-full transform -rotate-12 shadow-sm"></div>
            <div className="absolute -top-2 right-2 w-3 h-4 bg-gradient-to-br from-orange-400 to-amber-500 rounded-t-full transform rotate-12 shadow-sm"></div>
            
            {/* Cat face */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              {/* Eyes with animation */}
              <div className="flex space-x-2">
                <div className={`w-2 h-2 bg-black rounded-full transition-all duration-200 ${isRunning ? 'animate-pulse' : ''}`}></div>
                <div className={`w-2 h-2 bg-black rounded-full transition-all duration-200 ${isRunning ? 'animate-pulse' : ''}`}></div>
              </div>
            </div>
            
            {/* Cat nose with color */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full shadow-sm"></div>
            
            {/* Cat mouth */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-1 border-b-2 border-gray-800 rounded-b-full"></div>
            
            {/* Cat stripes with enhanced colors */}
            <div className="absolute top-1 left-1 right-1 h-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded opacity-60"></div>
            <div className="absolute top-3 left-2 right-2 h-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded opacity-60"></div>
          </div>
          
          {/* Cat tail with enhanced animation */}
          <div 
            className={`absolute -right-2 top-2 w-6 h-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full origin-left transition-all duration-500 shadow-sm ${
              isRunning ? 'animate-wiggle' : ''
            }`}
           ></div>
         </div>
         
         {/* Enhanced speech bubble */}
         {speechBubble && (
           <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white/95 dark:bg-gray-800/95 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-2xl border border-white/50 dark:border-gray-600/50 shadow-2xl text-sm whitespace-nowrap animate-fadeIn backdrop-blur-sm">
             {speechBubble}
             {/* Enhanced speech bubble arrow */}
             <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-white/95 dark:border-t-gray-800/95"></div>
             {/* Glow effect */}
             <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-2xl -z-10 blur-sm"></div>
           </div>
         )}
       </div>       

       {/* Enhanced Stage Label */}
       <div className="absolute top-4 left-4 glass rounded-xl px-3 py-2 shadow-lg">
         <div className="flex items-center space-x-2">
           <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
           <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Stage</span>
         </div>
       </div>

       {/* Enhanced Position Display */}
       <div className="absolute top-4 right-4 glass rounded-xl px-3 py-2 shadow-lg">
         <div className="text-xs font-mono text-gray-700 dark:text-gray-200">
           <div className="flex items-center space-x-2">
             <span className="text-blue-500">📍</span>
             <span>x: {Math.round(position.x)}, y: {Math.round(position.y)}</span>
           </div>
         </div>
       </div>      

       {/* Enhanced Running Indicator */}
      {isRunning && (
        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-2xl text-sm font-bold flex items-center space-x-2 shadow-lg shadow-green-200 animate-slideInLeft backdrop-blur-sm">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <span>Running Code...</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      )}
      
      {/* Completion Celebration */}
      {!isRunning && position.x !== 0 && (
        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-2xl text-sm font-bold animate-fadeIn shadow-lg">
          <span className="flex items-center space-x-2">
            <span>🎉</span>
            <span>Great job!</span>
          </span>
        </div>
      )}
    </div>
  );
}
