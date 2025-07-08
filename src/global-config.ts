import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  assetsDir: string;
  auth: {
    method: 'jwt' | 'amplify' | 'firebase' | 'supabase' | 'auth0';
    skip: boolean;
    redirectPath: string;
  };
  mapboxApiKey: string;
  firebase: {
    appId: string;
    apiKey: string;
    projectId: string;
    authDomain: string;
    storageBucket: string;
    measurementId: string;
    messagingSenderId: string;
  };
  firestore: string;
  backendServer: string;
  backendUser: string;
  backendPw: string;
  matomoUrl: string;
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'Cirelis',
  appVersion: packageJson.version,
  serverUrl: import.meta.env.VITE_SERVER_URL ?? '',
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? '',
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: 'firebase',
    skip: false,
    redirectPath: paths.dashboard.root,
  },
  /**
   * Mapbox
   */
  mapboxApiKey: import.meta.env.VITE_MAPBOX_API_KEY ?? '',
  /**
   * Firebase
   */
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: import.meta.env.VITE_FIREBASE_APPID ?? '',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? '',
  },
  firestore: import.meta.env.VITE_FIREBASE_FIRESTORE ?? '',
  backendServer: import.meta.env.VITE_BACKENDSERVER ?? '',
  backendUser: import.meta.env.VITE_BACKENDUSER ?? '',
  backendPw: import.meta.env.VITE_BACKENDPW ?? '',
  matomoUrl: import.meta.env.VITE_MATOMOURL?? '',
};
