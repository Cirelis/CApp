import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';

import { MainLayout } from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { funnelRoutes } from './funnel';
import { dashboardRoutes } from './dashboard';
// ----------------------------------------------------------------------

const HomePage = lazy(() => import('src/pages/home'));
const Page404 = lazy(() => import('src/pages/error/404'));

export const routesSection: RouteObject[] = [
  {
    path: '/',
    /**
     * @skip homepage
     * import { Navigate } from "react-router";
     * import { CONFIG } from 'src/global-config';
     *
     * element: <Navigate to={CONFIG.auth.redirectPath} replace />,
     * and remove the element below:
     */
    element: (
      <Suspense fallback={<SplashScreen />}>
        <MainLayout>
          <HomePage />
        </MainLayout>
      </Suspense>
    ),
  },

  // Auth
  ...authRoutes,

  // Dashboard
  ...dashboardRoutes,

  // Main
  ...mainRoutes,

  // Funnel routes
  ...funnelRoutes,

  // No match
  { path: '*', element: <Page404 /> },
];
