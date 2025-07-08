import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langWidgets/_langWidgets';

// Function to generate a shorter numeric UUID (6-8 digits)
const generateShortNumericUUID = (): string =>
  `${Date.now().toString().slice(-5)}${Math.floor(Math.random() * 90 + 10)}`;

// Function to create a new instance of CustomWidget with a new ID
export const createCustomWidget = (): IWidget => {
  const dropId = generateShortNumericUUID();
  return {
    id: uuid(),
    name: 'CustomWidget',
    order: 0,
    drop: 0,
    category: 'Basic',
    company: '',
    open: false,
    label: {
      id: 'customwidget',
      name: 'Custom Widget',
      color: 'black',
    },
    childs: [
      {
        id: 'Head',
        open: true,
        show: true,
        attributes: {
          Custom_ID: {
            feId: 'Custom_ID',
            template: true,
            keyValueTemp: [],
            translate: false,
            data: false,
            valueType: 'value',
            name: getDesc('Custom_ID'),
            value: getValue('Custom_ID'),
          },
          WidgetHeadline_CustomWidget: {
            feId: 'WidgetHeadline_CustomWidget',
            template: true,
            keyValueTemp: [],
            translate: true,
            data: false,
            valueType: 'value',
            name: getDesc('WidgetHeadline_CustomWidget'),
            value: getValue('WidgetHeadline_CustomWidget'),
          },
          WidgetIcon_CustomWidget: {
            feId: 'WidgetIcon_CustomWidget',
            template: true,
            keyValueTemp: [],
            translate: false,
            data: false,
            valueType: 'value',
            name: getDesc('WidgetIcon_CustomWidget'),
            value: getValue('WidgetIcon_CustomWidget'),
          },
          DropId_CustomWidget: {
            feId: 'DropId_CustomWidget',
            template: true,
            keyValueTemp: [],
            translate: true,
            data: false,
            valueType: 'value',
            name: getDesc('DropId_CustomWidget'),
            value: [
              { lang: 'en', val: [dropId] },
              { lang: 'de', val: [dropId] },
              { lang: 'es', val: [dropId] },
              { lang: 'fr', val: [dropId] },
              { lang: 'it', val: [dropId] },
            ],
          },
        },
      },
    ],
    style: {},
  };
};
