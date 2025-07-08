import React, { ReactNode, useMemo } from 'react';
import { IDesign, IWidget } from 'src/types/product';
import { CompanyContext } from './use-company-id';
import { DesignContext } from './use-design';
import { LanguageContext } from './use-label-language';
import { ProductContext } from './use-product-id';
import { WidgetContext } from './use-widgets';

type Props = {
  companyId?: string;
  productId?: string;
  availLanguage?: string[];
  design?: IDesign;
  widget?: IWidget;
  children: ReactNode;
};

export const composeContextProviders =
  (providers: { Provider: React.ComponentType<any>; value?: any }[]) =>
  ({ children }: { children: ReactNode }) =>
    providers
      .filter((provider) => provider.value !== undefined)
      .reduceRight(
        (acc, { Provider, value }) => <Provider value={value}>{acc}</Provider>,
        children
      );

/**
 * Dynamically adds the provided context providers
 * @returns Nested context providers
 */
export const AppProviders = ({ companyId, productId, availLanguage, design, widget, children }: Props) => {
  const ComposedProviders = useMemo(() => {
    const providers = [
      { Provider: DesignContext.Provider, value: design },
      { Provider: CompanyContext.Provider, value: companyId },
      { Provider: ProductContext.Provider, value: productId },
      { Provider: LanguageContext.Provider, value: availLanguage },
      { Provider: WidgetContext.Provider, value: widget },
    ];
    return composeContextProviders(providers);
  }, [companyId, productId, availLanguage, design, widget]);

  const isReady = companyId || productId || (availLanguage && availLanguage.length > 0);

  if (!isReady) {
    return null; // Maybe loading spinner
  }

  return <ComposedProviders>{children}</ComposedProviders>;
};
