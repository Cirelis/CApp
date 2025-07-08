import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { Heading } from './_heading';
import { Subheading } from './_subheading';
import { Textblock } from './_textblock';
import { ActionButton } from './_actionButton';
import { ShowcaseCarousel } from './_showcaseCarousel';
import { ShowcaseImage } from './_showcaseImage';
import { ShowcaseVideo } from './_showcaseVideo';
import { Document } from './_document';
import { Story } from './_story';

// Create base components array
export const _components: IWidget[] = [
  Heading,
  Subheading,
  Textblock,
  ActionButton,
  ShowcaseCarousel,
  ShowcaseImage,
  ShowcaseVideo,
  Document,
  Story
];

function cloneWithNewIds(components: IWidget[]): IWidget[] {
  return components.map((component) => ({
    ...component,
    id: uuid(),
    childs: component.childs.map((child) => ({
      ...child,
      id: uuid(), // Assign new ID to each child
      attributes: Object.entries(child.attributes).reduce<Record<string, any>>(
        (acc, [key, attr]) => {
          acc[key] = {
            ...attr,
            feId: uuid(), // Generate new feId
            value: Array.isArray(attr.value) ? [...attr.value] : attr.value, // Safely copy value
          };
          return acc;
        },
        {}
      ),
    })),
    style: {
      ...component.style,
    },
  }));
}

// Generate custom components with unique IDs
export const _customComponents: IWidget[] = cloneWithNewIds(_components);