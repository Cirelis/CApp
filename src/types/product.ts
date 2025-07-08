// ----------------------------------------------------------------------

export type IBackProduct = {
  gtin: string;
  company: string;
  name: string;
  customerId: string;
  tags: string;
  labelLanguage: string;
  labelTemplate: string;
  qrTemplate: string;
  redirect: string;
  redirectURL: string;
};

export type IProduct = {
  id: string;
  name: string;
  gtin: string;
  secondary: string;
  img: string;
  tags: string[];
  status: string;
  change: string;
  changeClosed: string;
  url: string;
  version: string;
  publishedAt: string;
  template: string;
  templateId: string;
  tempChangeAt: string;
  redirect: string;
  redirectURL: string;
  company: string;
  companyId: string;
  defaultLang: string;
  availLang: string[];
  liveLang: string[];
  changedBy: string;
  changedAt: string;
  createdBy: string;
  createdAt: string;
  archived: string;
  archivedDate: string;
  qrTemplate: string;
  qr: IQRCode;
  pass: IProductPass;
  live: IProductPass;
};

export type IProductPass = {
  mode: string;
  widgets: IWidget[];
  design: IDesign;
};

export type IWidget = {
  id: string;
  name: string;
  order: number;
  drop: number;
  category: string;
  company: string;
  label: ILabel;
  open: boolean;
  childs: IWidgetChilds[];
  style: {
    [key: string]: {
      name: string;
      value: string[];
    };
  };
};

export type IWidgetChilds = {
  id: string;
  open: boolean;
  show: boolean;
  attributes: {
    [key: string]: {
      feId: string;
      template: boolean;
      keyValueTemp: IKeyValueControl[];
      translate: boolean;
      data: boolean;
      valueType: string;
      name: IDesc[];
      value: IValue[];
    };
  };
};

export type IKeyValueControl = {
  keyTemp: boolean;
  valueTemp: boolean;
};

export type ILabel = {
  id: string;
  name: string;
  color: string;
};

export type IStyle = {
  general: {
    topButton: boolean;
    widgetSpacing: 'S' | 'M' | 'L';
    spacing: 'S' | 'M' | 'L';
  };
  buttons: {
    variant: string;
    size: string;
    textColor: string;
    buttonColor: string;
  };
  cards: {
    cardDesign: boolean;
    borderradius: number;
    color: string;
  };
  icons: {
    showIcons: boolean;
    iconColor: string;
    showSubIcons: boolean;
    subIconColor: string;
  };
  colors: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    generalTextColor: string;
    elementsColor: string;
  };
};

export type ITypo = {
  headlines: {
    font: string;
    weight: string;
    color: string;
    size: string;
  };
  paragraphs: {
    font: string;
    weight: string;
    color: string;
    size: string;
  };
  tags: {
    font: string;
    weight: string;
    color: string;
    tagColor: string;
  };
  table: {
    font: string;
    weight: string;
    color: string;
  };
};

export type IDesign = {
  style: IStyle;
  typography: ITypo;
};

export type IQRCode = {
  id: string;
  qrTemplate: string;
  ecLevel: string;
  shape: string;
  bgColor: string;
  fgColor: string;
  logoImage: string;
  logoSize: number;
  qrStyle: string;
  cornerStyle: string;
  eyeColor: string;
};

export type IProductTableFilters = {
  name: string;
  tags: string[];
  templates: string[];
  status: string;
};

export type IProductTableFilterValue = string | string[];

export type IWidgetColumn = {
  id: string;
  name: string;
  taskIds: string[];
};

export type IPassWidgets = {
  widgets: Record<string, IWidget>;
  columns: Record<string, IWidgetColumn>;
  ordered: string[];
};

export type IWidgetListItem = {
  id: string;
  name: string;
  color: string;
};

export type ILangWidget = ILangItem[];

export type ILangItem = {
  feId: string;
  desc: IDesc[];
  value: IValue[];
};

export type IDesc = {
  lang: string;
  val: string;
};
export type IValue = {
  lang: string;
  val: any[];
};
