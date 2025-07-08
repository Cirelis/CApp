import { createContext, useContext } from 'react';

export const CompanyContext = createContext<string>('');

export function useCompanyId() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompanyId must be used within a CompanyContext.Provider');
  }
  return context;
}
