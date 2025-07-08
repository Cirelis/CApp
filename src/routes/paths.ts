import { kebabCase } from 'es-toolkit';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];
const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
  SAVED: '/s',
  FUNNEL: '/',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  // AUTH
  auth: {
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    funnel: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      list: `${ROOTS.DASHBOARD}/product/list`,
      editor: (productId: string) => `${ROOTS.DASHBOARD}/product/pass/${productId}`,
      // template: (productId: string) => `${ROOTS.DASHBOARD}/product/template/${productId}`,
      // version: (productId: string) => `${ROOTS.DASHBOARD}/product/version/${productId}`,
    },
    analytics: {
      root: `${ROOTS.DASHBOARD}/analytics`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user/account`,
      account: `${ROOTS.DASHBOARD}/user/account`,
    },
    management: {
      root: `${ROOTS.DASHBOARD}/management/account`,
      account: `${ROOTS.DASHBOARD}/management/account`,
      userslist: `${ROOTS.DASHBOARD}/management/userslist`,
    },
    label: {
      root: ROOTS.FUNNEL,
      funnelId: (funnelId: string) => `${ROOTS.FUNNEL}/${funnelId}`,
    },
    saved: {
      root: ROOTS.SAVED,
      funnelId: (funnelId: string) => `${ROOTS.SAVED}/${funnelId}`,
    },
  },
};
