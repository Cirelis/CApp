import path from 'path';
import fs from 'fs';
import checker from 'vite-plugin-checker';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// ----------------------------------------------------------------------

const PORT = 8080;

export default defineConfig(async ({ mode }) => {
  // Load env from .env, .env.local, .env.<mode>, etc.
  // You can set these to different hosts/ports per backend service.
  const env = loadEnv(mode, process.cwd(), '');

  // Example targets (override in env files):
  const CIRELIS_API_TARGET = env.VITE_BACKENDSERVER || '';

  return {
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
          dev: { logLevel: ['error'] },
        },
        overlay: {
          position: 'tl',
          initialIsOpen: false,
        },
      }),
      VitePWA({
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.ts',
        injectManifest: {
          maximumFileSizeToCacheInBytes: 25 * 1024 * 1024, // 25 MB
        },
        // Avoid a dev Service Worker unless you are explicitly testing PWA behavior.
        // This prevents SW caching/evaluation issues from breaking local development.
        devOptions: {
          enabled: true,
          type: 'module',
        },
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Cirelis',
          short_name: 'App',
          description: 'Cirelis',
          theme_color: '#ffffff10',
          icons: [
            {
              src: 'logo/logo-icon.png',
              sizes: '192x192',
              type: 'image/svg',
            },
            {
              src: 'logo/logo-icon.png',
              sizes: '512x512',
              type: 'image/svg',
            },
            {
              src: 'logo/logo-icon.png',
              sizes: '512x512',
              type: 'image/svg',
              purpose: 'any maskable',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: /^src(.+)/,
          replacement: path.resolve(process.cwd(), 'src/$1'),
        },
      ],
    },
    server: {
      host: true,
      port: PORT,
      https: (() => {
        try {
          return {
            key: fs.readFileSync(path.resolve(__dirname, 'certs/dev.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'certs/dev.crt')),
          };
        } catch {
          console.warn('⚠️  HTTPS certs not found, falling back to HTTP');
          return undefined;
        }
      })(),
      proxy: {
        // Proxy each backend behind its own prefix so the browser only has to trust Vite's cert.
        // Use these prefixes from the frontend:
        '/api-cirelis': {
          target: CIRELIS_API_TARGET,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api-cirelis/, ''),
        },
      },
    },
    preview: { port: PORT, host: true },
  };
});
