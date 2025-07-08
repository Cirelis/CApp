import { createContext, useContext } from 'react';
import { IDesign } from 'src/types/product';

export const DesignContext = createContext<IDesign>({} as IDesign);

export function useDesign() {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesign must be used within a DesignContext.Provider');
  }
  return context;
}
