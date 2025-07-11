//
import { v4 as uuid } from 'uuid';
import { IWidget } from 'src/types/product';
import { getDesc, getValue } from '../langWidgets/_langWidgets';

// ----------------------------------------------------------------------

export const FooterWidget: IWidget = {
  id: uuid(),
  name: 'FooterWidget',
  order: 0,
  drop: 0,
  category: 'Required',
  company: '',
  open: false,
  label: {
    id: 'footer',
    name: 'Footer',
    color: 'black',
  },
  childs: [
    {
      id: 'Head',
      open: true,
      show: true,
      attributes: {
        WebsiteURL: {
          feId: 'WebsiteURL',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('WebsiteURL'),
          value: getValue('WebsiteURL'),
        },
        ShowWebsiteURL: {
          feId: 'ShowWebsiteURL',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('ShowWebsiteURL'),
          value: getValue('ShowWebsiteURL'),
        },
        XURL: {
          feId: 'XURL',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('XURL'),
          value: getValue('XURL'),
        },
        ShowXURL: {
          feId: 'ShowXURL',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('ShowXURL'),
          value: getValue('ShowXURL'),
        },
        InstagramURL: {
          feId: 'InstagramURL',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('InstagramURL'),
          value: getValue('InstagramURL'),
        },
        ShowInstagramURL: {
          feId: 'ShowInstagramURL',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('ShowInstagramURL'),
          value: getValue('ShowInstagramURL'),
        },
        FacebookURL: {
          feId: 'FacebookURL',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('FacebookURL'),
          value: getValue('FacebookURL'),
        },
        ShowFacebookURL: {
          feId: 'ShowFacebookURL',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('ShowFacebookURL'),
          value: getValue('ShowFacebookURL'),
        },
        LinkedInURL: {
          feId: 'LinkedInURL',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('LinkedinURL'),
          value: getValue('LinkedinURL'),
        },
        ShowLinkedInURL: {
          feId: 'ShowLinkedInURL',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('ShowLinkedinURL'),
          value: getValue('ShowLinkedinURL'),
        },
        WebsiteName: {
          feId: 'WebsiteName',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('WebsiteName'),
          value: getValue('WebsiteName'),
        },
        Imprint: {
          feId: 'Imprint',
          template: true,
          keyValueTemp: [],
          translate: false,
          data: false,
          valueType: 'value',
          name: getDesc('Imprint'),
          value: getValue('Imprint'),
        },
      },
    },
  ],
  style: {
    Orientation: {
      name: 'Orientation',
      value: ['center'],
    },
    ShowRightsReserved: {
      name: 'Show Rights Reserved',
      value: ['X'],
    },
    Logo: {
      name: 'Logo',
      value: [''],
    },
    ShowLogo: {
      name: 'Show Logo',
      value: [''],
    },
    LogoFilename: {
      name: 'Logo Filename',
      value: [''],
    },
  },
};
