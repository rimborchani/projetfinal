'use client';

import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm text-slate-700 dark:text-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 border-blue-200/50 dark:border-emerald-700/50 hover:bg-white/90 dark:hover:bg-slate-700/90 transform hover:scale-105"
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500">
          <path d="M21.64 13.65a1 1 0 0 0-1.05-.14 8 8 0 1 1-10-10 1 1 0 0 0-.14-1.05A1 1 0 0 0 9 2a10 10 0 1 0 13 13 1 1 0 0 0-.36-1.35z"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-emerald-500">
          <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm9-10v-2h-3v2h3zm-4.24-8.16l1.8 1.8 1.79-1.8-1.79-1.79-1.8 1.79zM12 6a6 6 0 100 12 6 6 0 000-12zm7.24 12.16l1.79 1.79 1.8-1.79-1.8-1.8-1.79 1.8zM4.84 17.24l-1.8 1.8 1.8 1.79 1.79-1.79-1.79-1.8z"/>
        </svg>
      )}
      <span className="text-sm font-semibold">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}
