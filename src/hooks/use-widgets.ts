import { createContext, useContext } from 'react';
import { IWidget } from 'src/types/product';

export const WidgetContext = createContext<IWidget[]>({} as IWidget[]);

export function useWidgets() {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useWidgets must be used within a WidgetContext.Provider');
  }
  return context;
}
