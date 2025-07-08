//
import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langComponents/_langComponents';

// ----------------------------------------------------------------------

export const Heading: IWidget = {
  id: uuid(),
  name: 'Heading',
  order: 0,
  drop: 0,
  category: 'Text',
  company: '',
  open: false,
  label: {
    id: 'heading',
    name: 'Heading',
    color: 'black',
  },
  childs: [
    {
      id: 'Head',
      open: true,
      show: true,
      attributes: {
        HeadingText: {
          feId: 'HeadingText',
          template: true,
          keyValueTemp: [],
          translate: true,
          data: true,
          valueType: 'value',
          name: getDesc('HeadingText'),
          value: getValue('HeadingText'),
        },
      },
    },
  ],
  style: {
    Orientation: {
      name: 'Orientation',
      value: ['center'],
    },
    YMargin: {
      name: 'YMargin',
      value: ['0'],
    },
  },
};
