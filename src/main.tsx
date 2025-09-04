import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';
import App from './app';
import { routesSection } from './routes/sections';
import { ErrorBoundary } from './routes/components';
import { CONFIG } from './global-config';

// ----------------------------------------------------------------------

const instance = createInstance({
  urlBase: CONFIG.matomoUrl || '',
  siteId: 1,
});

const router = createBrowserRouter([
  {
    Component: () => (
      <>
        <MatomoProvider value={instance} />
        <App>
          <Outlet />
        </App>
      </>
    ),
    errorElement: <ErrorBoundary />,
    children: routesSection,
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);