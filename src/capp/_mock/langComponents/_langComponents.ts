//
import { IDesc, ILangWidget, IValue } from 'src/types/product';
import { LangHeading } from './_langHeading';
import { LangSubheading } from './_langSubheading';
import { LangTextblock } from './_langTextblock';
import { LangActionButton } from './_langActionButton';
import { LangDocument } from './_langDocument';
import { LangShowcaseCarousel } from './_langShowcaseCarousel';
import { LangShowcaseImage } from './_langShowcaseImage';
import { LangShowcaseVideo } from './_langShowcaseVideo';
import { LangStory } from './_langStory';

export const _langComponents: ILangWidget[] = [
  // Components
  LangHeading,
  LangSubheading,
  LangTextblock,
  LangActionButton,
  LangDocument,
  LangShowcaseCarousel,
  LangShowcaseImage,
  LangShowcaseVideo,
  LangStory
];

export function getDesc(feId: string) {
  let description: IDesc[] = []; // Initialize the description variable
  _langComponents.forEach((widget) => {
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
  _langComponents.forEach((widget) => {
    widget.forEach((attribute) => {
      if (attribute.feId === feId && attribute.value) {
        value = attribute.value;
      }
    });
  });
  return value; // Return the found value or the default one
}
