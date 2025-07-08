//
import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langComponents/_langComponents';

// ----------------------------------------------------------------------

export const ShowcaseImage: IWidget = {
  id: uuid(),
  name: 'ShowcaseImage',
  order: 0,
  drop: 0,
  category: 'Showcase',
  company: '',
  open: false,
  label: {
    id: 'image',
    name: 'Image',
    color: 'black',
  },
  childs: [
    {
      id: 'Head',
      open: true,
      show: true,
      attributes: {
        Image: {
          feId: 'Image',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: true,
          valueType: 'value',
          name: getDesc('Image'),
          value: getValue('Image'),
        },
        ImgFile: {
          feId: 'ImgFile',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: true,
          valueType: 'value',
          name: getDesc('ImgFile'),
          value: getValue('ImgFile'),
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
    Ratio: {
      name: 'Ratio',
      value: ['1/1'],
    },
  },
};
