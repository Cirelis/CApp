//
import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langComponents/_langComponents';

// ----------------------------------------------------------------------

export const Subheading: IWidget = {
  id: uuid(),
  name: 'Subheading',
  order: 0,
  drop: 0,
  category: 'Text',
  company: '',
  open: false,
  label: {
    id: 'subheading',
    name: 'Subheading',
    color: 'black',
  },
  childs: [
    {
      id: 'Head',
      open: true,
      show: true,
      attributes: {
        'SubheadingText': {
          feId: 'SubheadingText',
          template: true,
keyValueTemp: [],
          translate: true,
          data: true,
          valueType: 'value',
          name: getDesc('SubheadingText'),
          value: getValue('SubheadingText'),
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
