//
import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langComponents/_langComponents';

// ----------------------------------------------------------------------

export const Document: IWidget = {
  id: uuid(),
  name: 'Document',
  order: 0,
  drop: 0,
  category: 'Data',
  company: '',
  open: false,
  label: {
    id: 'document',
    name: 'Document',
    color: 'black',
  },
  childs: [
    {
      id: 'Head',
      open: true,
      show: true,
      attributes: {
        DocumentFile: {
          feId: 'DocumentFile',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('DocumentFile'),
          value: getValue('DocumentFile'),
        },
        DocumentName: {
          feId: 'DocumentName',
          template: true,
          keyValueTemp: [],
          translate: true,
          data: true,
          valueType: 'value',
          name: getDesc('DocumentName'),
          value: getValue('DocumentName'),
        },
        DocumentPath: {
          feId: 'DocumentPath',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('DocumentPath'),
          value: getValue('DocumentPath'),
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
