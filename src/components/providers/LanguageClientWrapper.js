'use client';

import { LanguageProvider } from '../../contexts/LanguageContext';

export default function LanguageClientWrapper({ children }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
