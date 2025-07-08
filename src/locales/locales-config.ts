import type { InitOptions } from 'i18next';
import type { Theme, Components } from '@mui/material/styles';

import resourcesToBackend from 'i18next-resources-to-backend';

// MUI Core Locales
import {
  frFR as frFRCore,
  deDE as deDECore,
  viVN as viVNCore,
  zhCN as zhCNCore,
  arSA as arSACore,
} from '@mui/material/locale';
// MUI Date Pickers Locales
import {
  enUS as enUSDate,
  deDE as deDEDate,
  frFR as frFRDate,
  viVN as viVNDate,
  zhCN as zhCNDate,
} from '@mui/x-date-pickers/locales';
// MUI Data Grid Locales
import {
  enUS as enUSDataGrid,
  deDE as deDEDataGrid,
  frFR as frFRDataGrid,
  viVN as viVNDataGrid,
  zhCN as zhCNDataGrid,
  arSD as arSDDataGrid,
} from '@mui/x-data-grid/locales';

// ----------------------------------------------------------------------

// Supported languages
export const supportedLngs = ['en', 'de', 'fr', 'vi', 'cn', 'ar'] as const;
export type LangCode = (typeof supportedLngs)[number];

// Fallback and default namespace
export const fallbackLng: LangCode = 'en';
export const defaultNS = 'common';

// Storage config
export const storageConfig = {
  cookie: { key: 'i18next', autoDetection: false },
  localStorage: { key: 'i18nextLng', autoDetection: false },
} as const;

// ----------------------------------------------------------------------

/**
 * @countryCode https://flagcdn.com/en/codes.json
 * @adapterLocale https://github.com/iamkun/dayjs/tree/master/src/locale
 * @numberFormat https://simplelocalize.io/data/locales/
 */

export type LangOption = {
  value: LangCode;
  label: string;
  countryCode: string;
  adapterLocale?: string;
  numberFormat: { code: string; currency: string };
  systemValue?: { components: Components<Theme> };
  icon: string;
};

export const allLangs: LangOption[] = [
  {
    value: 'de',
    label: 'German',
    countryCode: 'DE',
    adapterLocale: 'de',
    numberFormat: { code: 'de-DE', currency: 'EUR' },
    systemValue: {
      components: { ...enUSDate.components, ...enUSDataGrid.components },
    },
    icon: 'flagpack:de',
  },
  {
    value: 'en',
    label: 'English',
    countryCode: 'GB',
    adapterLocale: 'en',
    numberFormat: { code: 'en-US', currency: 'USD' },
    systemValue: {
      components: { ...enUSDate.components, ...enUSDataGrid.components },
    },
    icon: 'flagpack:gb-nir',
  },
  {
    value: 'fr',
    label: 'French',
    countryCode: 'FR',
    adapterLocale: 'fr',
    numberFormat: { code: 'fr-Fr', currency: 'EUR' },
    systemValue: {
      components: { ...deDECore.components, ...deDEDate.components, ...deDEDataGrid.components },
    },
    icon: 'flagpack:fr',
  },

];

// ----------------------------------------------------------------------

export const i18nResourceLoader = resourcesToBackend(
  (lang: LangCode, namespace: string) => import(`./langs/${lang}.json`)
);

export function i18nOptions(lang = fallbackLng, namespace = defaultNS): InitOptions {
  return {
    // debug: true,
    supportedLngs,
    fallbackLng,
    lng: lang,
    /********/
    fallbackNS: defaultNS,
    defaultNS,
    ns: namespace,
  };
}

export function getCurrentLang(lang?: string): LangOption {
  const fallbackLang = allLangs.find((l) => l.value === fallbackLng) ?? allLangs[0];

  if (!lang) {
    return fallbackLang;
  }

  return allLangs.find((l) => l.value === lang) ?? fallbackLang;
}
