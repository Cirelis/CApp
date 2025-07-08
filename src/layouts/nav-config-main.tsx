import type { NavMainProps } from './main/nav/types';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData: NavMainProps['data'] = [
  { title: 'Home', path: '/', icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" /> },
  {
    title: 'Pages',
    path: '/pages',
    icon: <Iconify width={22} icon="solar:file-bold-duotone" />,
    children: [
      { subheader: 'Dashboard', items: [{ title: 'Dashboard', path: CONFIG.auth.redirectPath }] },
    ],
  },
];
