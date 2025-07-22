//
import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langWidgets/_langWidgets';

// ----------------------------------------------------------------------

export const ProductHead: IWidget = {
  id: uuid(),
  name: 'ProductHead',
  order: 0,
  drop: 0,
  category: 'Required',
  company: '',
  open: false,
  label: {
    id: 'producthead',
    name: 'Product Head',
    color: 'black',
  },
  childs: [
    {
      id: 'Head',
      open: true,
      show: true,
      attributes: {
        ProductHeadBrandName: {
          feId: 'ProductHeadBrandName',
          template: true,
          keyValueTemp: [],
          translate: true,
          data: true,
          valueType: 'value',
          name: getDesc('ProductHeadBrandName'),
          value: getValue('ProductHeadBrandName'),
        },
        ProductHeadProductName: {
          feId: 'ProductHeadProductName',
          template: true,
          keyValueTemp: [],
          translate: true,
          data: true,
          valueType: 'value',
          name: getDesc('ProductHeadProductName'),
          value: getValue('ProductHeadProductName'),
        },
        ShowProductTags: {
          feId: 'ShowProductTags',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('ShowProductTags'),
          value: getValue('ShowProductTags'),
        },
        ProductHeadProductTags: {
          feId: 'ProductHeadProductTags',
          template: true,
          keyValueTemp: [],
          translate: true,
          data: true,
          valueType: 'list',
          name: getDesc('ProductHeadProductTags'),
          value: getValue('ProductHeadProductTags'),
        },
        ProductPicture: {
          feId: 'ProductPicture',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('ProductPicture'),
          value: getValue('ProductPicture'),
        },
        ProductBanner: {
          feId: 'ProductBanner',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('ProductBanner'),
          value: getValue('ProductBanner'),
        },
        ProductFilename: {
          feId: 'ProductFilename',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('ProductFilename'),
          value: getValue('ProductFilename'),
        },
        BannerFilename: {
          feId: 'BannerFilename',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('BannerFilename'),
          value: getValue('BannerFilename'),
        },
        ShowProduct: {
          feId: 'ShowProduct',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('ShowProduct'),
          value: getValue('ShowProduct'),
        },
        ShowBanner: {
          feId: 'ShowBanner',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('ShowBanner'),
          value: getValue('ShowBanner'),
        },
      },
    },
  ],
  style: {
    Orientation: {
      name: 'Orientation',
      value: ['left'],
    },
    ProductShape: {
      name: 'Product Shape',
      value: ['round'],
    },
    ProductSize: {
      name: 'Product Size',
      value: ['s'],
    },
    BannerShape: {
      name: 'Banner Shape',
      value: ['square'],
    },
    BannerSize: {
      name: 'Banner Size',
      value: ['21/9'],
    },
    NameSize: {
      name: 'Name Size',
      value: ['s'],
    },
    NameColor: {
      name: 'Name Color',
      value: [''],
    },
    CardBackground: {
      name: 'Card Background',
      value: [''],
    },
  },
};
