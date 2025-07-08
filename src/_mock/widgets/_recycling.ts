//
import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langWidgets/_langWidgets';

// ----------------------------------------------------------------------

export const Recycling: IWidget = {
  id: uuid(),
  name: 'Recycling',
  order: 0,
  drop: 0,
  category: 'Sustainability',
  company: 'MIvY2xAMEx4sxdjbOhER',
  open: false,
  label: {
    id: 'recycling',
    name: 'Recycling',
    color: 'black',
  },
  childs: [
    {
      id: 'Head',
      open: true,
      show: true,
      attributes: {
        WidgetHeadline_Recycling: {
          feId: 'WidgetHeadline_Recycling',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('WidgetHeadline_Recycling'),
          value: getValue('WidgetHeadline_Recycling'),
        },
      },
    },
  ],
  style: {},
};
