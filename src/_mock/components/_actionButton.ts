//
import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langComponents/_langComponents';

// ----------------------------------------------------------------------

export const ActionButton: IWidget = {
  id: uuid(),
  name: 'ActionButton',
  order: 0,
  drop: 0,
  category: 'Action',
  company: '',
  open: false,
  label: {
    id: 'actionbutton',
    name: 'Button',
    color: 'black',
  },
  childs: [
    {
      id: 'Head',
      open: true,
      show: true,
      attributes: {
        ButtonName: {
          feId: 'ButtonName',
          template: true,
          keyValueTemp: [],
          translate: true,
          data: false,
          valueType: 'value',
          name: getDesc('ButtonName'),
          value: getValue('ButtonName'),
        },
        ButtonUrl: {
          feId: 'ButtonUrl',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('ButtonUrl'),
          value: getValue('ButtonUrl'),
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
