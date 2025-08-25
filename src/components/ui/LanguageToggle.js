'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage, currentLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        type="button"
        aria-label="Toggle language"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm text-slate-700 dark:text-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 border-blue-200/50 dark:border-emerald-700/50 hover:bg-white/90 dark:hover:bg-slate-700/90 transform hover:scale-105"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-semibold">{currentLanguage.code.toUpperCase()}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-200/50 dark:border-emerald-700/50 overflow-hidden z-50 animate-fadeIn">
          {Object.values(languages).map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-all duration-200 ${
                language === lang.code
                  ? 'bg-gradient-to-r from-blue-500/10 to-emerald-500/10 dark:from-blue-400/10 dark:to-emerald-400/10 text-blue-700 dark:text-blue-300'
                  : 'hover:bg-slate-100/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{lang.name}</span>
                <span className="text-xs opacity-75">{lang.nativeName}</span>
              </div>
              {language === lang.code && (
                <div className="ml-auto">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
