'use client';

export default function Button({ 
  children, 
  onClick, 
  className = '', 
  disabled = false, 
  variant = 'primary',
  size = 'medium',
  ...props 
}) {
  const baseClasses = 'font-bold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white focus:ring-blue-300 shadow-blue-200 hover:shadow-blue-300',
    secondary: 'bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white focus:ring-gray-300 shadow-gray-200 hover:shadow-gray-300',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white focus:ring-green-300 shadow-green-200 hover:shadow-green-300',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white focus:ring-red-300 shadow-red-200 hover:shadow-red-300',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white focus:ring-yellow-300 shadow-yellow-200 hover:shadow-yellow-300',
    info: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white focus:ring-cyan-300 shadow-cyan-200 hover:shadow-cyan-300',
    purple: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white focus:ring-purple-300 shadow-purple-200 hover:shadow-purple-300',
    outline: 'border-2 border-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 focus:ring-blue-300 shadow-blue-100 hover:shadow-blue-200',
    glass: 'bg-white/20 backdrop-blur-lg border border-white/30 text-gray-800 dark:text-white hover:bg-white/30 focus:ring-white/50 shadow-white/20 hover:shadow-white/30'
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed transform-none hover:scale-100 hover:shadow-lg' 
    : 'cursor-pointer';

  const animationClasses = disabled 
    ? '' 
    : 'hover:animate-pulse-glow';

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${animationClasses} ${className} relative overflow-hidden`}
      disabled={disabled}
      {...props}
    >
      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
      
      {/* Ripple Effect */}
      {!disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
      )}
      
      {/* Glow Effect */}
      {!disabled && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-300"></div>
      )}
    </button>
  );
}
