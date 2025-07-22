//
import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langComponents/_langComponents';

// ----------------------------------------------------------------------

export const Textblock: IWidget = {
  id: uuid(),
  name: 'Textblock',
  order: 0,
  drop: 0,
  category: 'Text',
  company: '',
  open: false,
  label: {
    id: 'textblock',
    name: 'Textblock',
    color: 'black',
  },
  childs: [
    {
      id: 'Head',
      open: true,
      show: true,
      attributes: {
        TextBlockContent: {
          feId: 'TextBlockContent',
          template: true,
          keyValueTemp: [],
          translate: true,
          data: true,
          valueType: 'value',
          name: getDesc('TextBlockContent'),
          value: getValue('TextBlockContent'),
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
