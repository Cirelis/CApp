import { createContext, useContext } from 'react';

export const LanguageContext = createContext<string[]>([]);

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLang must be used within a LanguageContext.Provider');
  }
  return context;
}
