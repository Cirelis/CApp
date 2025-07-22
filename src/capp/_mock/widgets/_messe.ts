//
import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langWidgets/_langWidgets';

// ----------------------------------------------------------------------

export const Messe: IWidget = {
  id: uuid(),
  name: 'Messe',
  order: 0,
  drop: 0,
  category: 'Retention',
  company: 'MIvY2xAMEx4sxdjbOhER',
  open: false,
  label: {
    id: 'messe',
    name: 'Messe',
    color: 'black',
  },
  childs: [
    {
      id: 'Head',
      open: true,
      show: true,
      attributes: {
        Messe: {
          feId: 'Messe',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('Messe'),
          value: getValue('Messe'),
        },
      },
    },
  ],
  style: {},
};
