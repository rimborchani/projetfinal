'use client';

import { useLanguage } from '../../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const isTunisian = language === 'tn';
  
  return (
    <button
      type="button"
      aria-label="Toggle language"
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white/20 backdrop-blur-sm text-white shadow hover:bg-white/30 transition-all duration-300 border-white/30"
    >
      {isTunisian ? (
        <span className="text-lg">🇹🇳</span>
      ) : (
        <span className="text-lg">🇫🇷</span>
      )}
      <span className="text-sm font-medium">
        {isTunisian ? 'تونسي' : 'Français'}
      </span>
    </button>
  );
}
