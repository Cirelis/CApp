import { IWidget } from 'src/types/product';
import { FooterWidget } from './_footerWidget';
import { ProductHead } from './_productHead';
import { HoverButton } from './_hoverButton';
import { ProductInfo } from './_productInfo';
import { Labels } from './_labels';
import { createCustomWidget } from './_customWidget'; // Import function
import { Sustainability } from './_sustainability';
import { Patos } from './_patos';
import { Messe } from './_messe';
import { Recycling } from './_recycling';
import { Origin } from './_origin';
import { Storefinder } from './_storefinder';

// ----------------------------------------------------------------------

// Static widgets array (without CustomWidget)
const staticWidgets: IWidget[] = [
  HoverButton,
  ProductHead,
  ProductInfo,
  FooterWidget,
  Labels,
  Sustainability,
  Recycling,
  Patos,
  Messe,
  Origin,
  Storefinder,
];

// Hybrid function that combines static widgets and dynamic CustomWidget
export const getWidgets = (): IWidget[] => [
  ...staticWidgets,
  createCustomWidget(), // Generates a new instance each time
];