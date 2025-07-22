//
import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langComponents/_langComponents';

// ----------------------------------------------------------------------

export const ShowcaseVideo: IWidget = {
  id: uuid(),
  name: 'ShowcaseVideo',
  order: 0,
  drop: 0,
  category: 'Showcase',
  company: '',
  open: false,
  label: {
    id: 'video',
    name: 'Video',
    color: 'black',
  },
  childs: [
    {
      id: 'Head',
      open: true,
      show: true,
      attributes: {
        YoutubeEmbedID: {
          feId: 'YoutubeEmbedID',
          template: true,
keyValueTemp: [],
          translate: false,
          data: true,
          valueType: 'value',
          name: getDesc('YoutubeEmbedID'),
          value: getValue('YoutubeEmbedID'),
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
