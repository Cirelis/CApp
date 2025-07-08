import { createContext, useContext } from 'react';

export const ProductContext = createContext<string>('');

export function useProductId() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductId must be used within a ProductContext.Provider');
  }
  return context;
}
