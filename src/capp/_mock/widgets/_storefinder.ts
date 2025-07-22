import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langWidgets/_langWidgets';

export const Storefinder: IWidget = {
  id: uuid(),
  name: 'Storefinder',
  order: 0,
  drop: 0,
  category: 'Retention',
  company: '',
  open: false,
  label: {
    id: 'storefinder',
    name: 'Storefinder',
    color: 'black',
  },
  childs: [
    {
      id: 'Head',
      open: false,
      show: false,
      attributes: {
        WidgetHeadline_Storefinder: {
          feId: 'WidgetHeadline_Storefinder',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('WidgetHeadline_Storefinder'),
          value: getValue('WidgetHeadline_Storefinder'),
        },
      },
    },
  ],
  style: {
    objects: {
      name: '',
      value: [],
    },
  },
};
