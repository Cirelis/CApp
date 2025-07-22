//
import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langComponents/_langComponents';

// ----------------------------------------------------------------------

export const ShowcaseCarousel: IWidget = {
  id: uuid(),
  name: 'ShowcaseCarousel',
  order: 0,
  drop: 0,
  category: 'Showcase',
  company: '',
  open: false,
  label: {
    id: 'carousel',
    name: 'Carousel',
    color: 'black',
  },
  childs: [
    {
      id: 'Head',
      open: true,
      show: true,
      attributes: {
        Image1: {
          feId: 'Image1',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: true,
          valueType: 'value',
          name: getDesc('Image1'),
          value: getValue('Image1'),
        },
        Img1File: {
          feId: 'Img1File',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: true,
          valueType: 'value',
          name: getDesc('Img1File'),
          value: getValue('Img1File'),
        },
        Image2: {
          feId: 'Image2',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: true,
          valueType: 'value',
          name: getDesc('Image2'),
          value: getValue('Image2'),
        },
        Img2File: {
          feId: 'Img2File',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: true,
          valueType: 'value',
          name: getDesc('Img2File'),
          value: getValue('Img2File'),
        },
        Image3: {
          feId: 'Image3',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: true,
          valueType: 'value',
          name: getDesc('Image3'),
          value: getValue('Image3'),
        },
        Img3File: {
          feId: 'Img3File',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: true,
          valueType: 'value',
          name: getDesc('Img3File'),
          value: getValue('Img3File'),
        },
        Image4: {
          feId: 'Image4',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: true,
          valueType: 'value',
          name: getDesc('Image4'),
          value: getValue('Image4'),
        },
        Img4File: {
          feId: 'Img4File',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: true,
          valueType: 'value',
          name: getDesc('Img4File'),
          value: getValue('Img4File'),
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
