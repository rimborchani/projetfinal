'use client';

import { useLanguage } from '../../contexts/LanguageContext';

export default function TranslationDemo() {
  const { t, language } = useLanguage();

  const demoStrings = [
    'app.title',
    'welcome',
    'codingPlayground',
    'ready',
    'running',
    'excellent',
    'nextStep',
    'checkWork'
  ];

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-blue-200/50 dark:border-emerald-700/50 mb-6">
      <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
        {t('translations')} - {language.toUpperCase()}
      </h3>
      <div className="grid gap-2 text-sm">
        {demoStrings.map((key) => (
          <div key={key} className="flex justify-between items-center py-1 px-3 bg-slate-50/50 dark:bg-slate-700/50 rounded-lg">
            <code className="text-blue-600 dark:text-blue-400">{key}:</code>
            <span className="font-medium text-slate-700 dark:text-slate-200">{t(key)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
