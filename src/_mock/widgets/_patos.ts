//
import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langWidgets/_langWidgets';

// ----------------------------------------------------------------------

export const Patos: IWidget = {
  id: uuid(),
  name: 'Patos',
  order: 0,
  drop: 0,
  category: 'Retention',
  company: 'MIvY2xAMEx4sxdjbOhER',
  open: false,
  label: {
    id: 'patos',
    name: 'Patos',
    color: 'black',
  },
  childs: [
    {
      id: 'Head',
      open: true,
      show: true,
      attributes: {
        Patos: {
          feId: 'Patos',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('Patos'),
          value: getValue('Patos'),
        },
      },
    },
  ],
  style: {},
};
