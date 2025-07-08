import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router';
// layouts
import LabelLayout from 'src/layouts/label';
// components
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------
const FunnelPage = lazy(() => import('src/pages/funnel'));

// ----------------------------------------------------------------------
export const funnelRoutes = [
  {
    path: 'l',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: ':labelId',
        element: (
          <LabelLayout>
            <FunnelPage />
          </LabelLayout>
        ),
      },
    ],
  },
];
