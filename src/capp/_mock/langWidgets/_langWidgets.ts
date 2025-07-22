//
import { IDesc, ILangWidget, IValue } from 'src/types/product';
import { LangFooter } from './_langFooter';
import { LangProductHead } from './_langProductHead';
import { LangProductInfo } from './_langProductInfo';
import { LangRebuy } from './_langRebuy';
import { LangCertificates } from './_langCertificates';
import { LangCustomWidget } from './_langCustomWidget';
import { LangSustainability} from './_langSustainability';
import { LangOrigin } from './_langOrigin';
import { LangOthers } from './_langOther';
import { LangStorefinder } from './_langStorefinder';

export const _langWidgets: ILangWidget[] = [
  // Widgets
  LangFooter,
  LangProductHead,
  LangProductInfo,
  LangRebuy,
  LangCertificates,
  LangCustomWidget,
  LangSustainability,
  LangOrigin,
  LangStorefinder,
  LangOthers,
];

export function getDesc(feId: string) {
  let description: IDesc[] = []; // Initialize the description variable
  _langWidgets.forEach((widget) => {
    widget.forEach((attribute) => {
      if (attribute.feId === feId && attribute.desc) {
        description = attribute.desc;
      }
    });
  });
  return description; // Return the description or null if not found
}

export function getValue(feId: string) {
  let value: IValue[] = []; // Initialize the value with a default value
  _langWidgets.forEach((widget) => {
    widget.forEach((attribute) => {
      if (attribute.feId === feId && attribute.value) {
        value = attribute.value;
      }
    });
  });
  return value; // Return the found value or the default one
}
