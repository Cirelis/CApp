import { ILangWidget } from 'src/types/product';

export const LangActionButton: ILangWidget = [
  {
    feId: 'ButtonName',
    desc: [
      { lang: 'en', val: 'Name' },
      { lang: 'de', val: 'Aktion' },
      { lang: 'es', val: 'Nombre' },
      { lang: 'fr', val: 'Nom' },
      { lang: 'it', val: 'Nome' },
    ],
    value: [
      { lang: 'en', val: ['Action'] },
      { lang: 'de', val: ['Aktion'] },
      { lang: 'es', val: ['Acción'] },
      { lang: 'fr', val: ['Action'] },
      { lang: 'it', val: ['Azione'] },
    ],
  },
  {
    feId: 'ButtonUrl',
    desc: [
      { lang: 'en', val: 'Url' },
      { lang: 'de', val: 'Url' },
      { lang: 'es', val: 'Url' },
      { lang: 'fr', val: 'Url' },
      { lang: 'it', val: 'Url' },
    ],
    value: [
      { lang: 'en', val: [] },
      { lang: 'de', val: [] },
      { lang: 'es', val: [] },
      { lang: 'fr', val: [] },
      { lang: 'it', val: [] },
    ],
  },
];