import { ILangWidget } from 'src/types/product';

export const LangStorefinder: ILangWidget = [
  {
    feId: 'WidgetHeadline_Storefinder',
    desc: [
      { lang: 'en', val: 'Storefinder' },
      { lang: 'de', val: 'Kauforte' },
      { lang: 'es', val: 'Localizador de tiendas' },
      { lang: 'fr', val: 'Trouver un magasin' },
      { lang: 'it', val: 'Trova negozio' },
    ],
    value: [
      { lang: 'en', val: ['Where can I buy it?'] },
      { lang: 'de', val: ['Wo kann ich es kaufen?'] },
      { lang: 'es', val: ['¿Dónde puedo comprarlo?'] },
      { lang: 'fr', val: ['Où puis-je l’acheter ?'] },
      { lang: 'it', val: ['Dove posso comprarlo?'] },
    ],
  },
];