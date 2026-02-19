/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;


import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

// Take control ASAP so new deployments activate without requiring all tabs to close.
// (vite-plugin-pwa + injectManifest)
self.skipWaiting();
clientsClaim();

// Remove old precaches created by previous versions.
cleanupOutdatedCaches();

// VitePWA / Workbox Precache
// In production builds (injectManifest), Workbox replaces `self.__WB_MANIFEST`.
// In dev, it may be missing — so fall back to an empty list instead of crashing.
const wbManifest = (self as any).__WB_MANIFEST as any[] | undefined;
precacheAndRoute(Array.isArray(wbManifest) ? wbManifest : []);

// Allow the app to trigger activation of a waiting SW (useful for “Update available” prompts)
self.addEventListener('message', (event) => {
  if ((event as any)?.data && (event as any).data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});


self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const rawUrl = (event.notification.data as any)?.url ?? (event.notification.data as any)?.rawUrl ?? '/';
  const url = new URL(rawUrl, self.location.origin).toString();

  const parsed = new URL(url);
  if (parsed.origin !== self.location.origin) {
    // Only allow same-origin navigation from notification clicks.
    return;
  }

  event.waitUntil(
    (async () => {
      const windowClients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      // Try to find an existing tab on our origin
      const matching = windowClients.find((c) =>
        (c as WindowClient).url.startsWith(self.location.origin)
      ) as WindowClient | undefined;

      if (matching) {
        await matching.focus();
        // Some browsers (and iOS PWAs) are flaky with navigate() from SW.
        // If we're not already on the target URL, open it in a new window/tab.
        if (!matching.url || matching.url !== url) {
          await self.clients.openWindow(url);
        }
        return;
      }

      await self.clients.openWindow(url);
    })()
  );
});

