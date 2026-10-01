# Build your first PWA

**Startpunt:** Een webapplicatie met een servercommunicatie en een formulier.
**Eindresultaat:** een installeerbare app die na één bezoek ook offline werkt, met een offline-banner en een melding bij een nieuwe versie. Hij staat live op GitHub Pages.

> **Let op:** een service worker werkt niet met `npm run dev`. Test elke stap met `npm run build && npm run preview`, en kijk in Chrome DevTools → **Application**.

## 1. De plugin installeren

- [ ] `npm install -D vite-plugin-pwa`
- [ ] Voeg in `vite.config.ts` `VitePWA({ ... })` toe aan `plugins`. Vervang de config met onderstaande snippet
```javascript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // On GitHub Pages the app lives in a subfolder (/<repo>/). The workflow sets BASE_PATH,
  // locally it's just "/".
  base: process.env.BASE_PATH ?? '/',
  plugins: [
    react(),
    VitePWA({
      // Uncomment following line to don't update silently: show a prompt so the user decides when to reload
      // registerType: 'prompt',
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'My First PWA',
        short_name: 'Cars',
        description: 'Browse and search cars, also offline.',
        theme_color: '#aa3bff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache the app itself (HTML, JS, CSS, icons): it works offline after the first visit
        
        // Cache the API response as well. NetworkFirst: fresh data when online,
        // the last cached copy when offline (or when the network takes longer than 3s)
       
      },
    }),
  ],
})

``` 

- [ ] Voeg in `tsconfig.app.json` `"vite-plugin-pwa/react"` toe aan `types`.

## 2. Iconen en manifest

- [ ] `npm install -D @vite-pwa/assets-generator`
- [ ] Maak `pwa-assets.config.ts` met `minimal2023Preset` en `images: ["public/favicon.svg"]`.

Voorbeeld:

```typescript
import { defineConfig, minimal2023Preset } from "@vite-pwa/assets-generator/config";

// Generates the app icons (npm run generate:icons) from public/favicon.svg
export default defineConfig({
  preset: minimal2023Preset,
  images: ["public/favicon.svg"],
});
```

- [ ] Voeg het script `"generate:icons": "pwa-assets-generator"` toe en voer het uit. Kijk welke PNG's er in `public/` bijkomen.
- [ ] Voeg in `index.html` `<head>` een `apple-touch-icon` en een `theme-color` toe.

```html
    <link rel="icon" href="/favicon.ico" sizes="48x48" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
    <meta name="theme-color" content="#aa3bff" />
```

**Controleer:** in DevTools → Application → Manifest staan de naam en iconen zonder fouten, en de browser biedt aan om de app te installeren. Niets te zien? Kijk even bovenaan deze 😇😇 

## 3. Offline werken

- [ ] Zet in `workbox.globPatterns` welke bestanden de service worker vooraf opslaat (JS, CSS, HTML, iconen).

```typescript
globPatterns: ['**/*.{js,css,html,svg,png,ico}']
```

- [ ] Voeg een `runtimeCaching`-regel toe voor `cars.json` met `handler: "NetworkFirst"` en `networkTimeoutSeconds: 3`.

```typescript
 runtimeCaching: [{
urlPattern: ({ url }) => url.href === 'https://avans.blob.core.windows.net/cars-api/cars.json',
handler: 'NetworkFirst',
options: {
    cacheName: 'cars-api',
    networkTimeoutSeconds: 3,
}}]
```

- [ ] Zet in `main.tsx` bij de `QueryClient` de standaardoptie `networkMode: "offlineFirst"`.

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // By default TanStack Query pauses queries while the browser is offline, so the
      // fetch would never reach the service worker cache. "offlineFirst" always tries once.
      networkMode: 'offlineFirst',
    },
  },
})
```


> **Waarom `NetworkFirst`?** Online krijg je verse data, offline de laatst opgeslagen versie. Bekijk het verschil met `CacheFirst` en `StaleWhileRevalidate`.
> **Waarom `offlineFirst`?** Standaard pauzeert TanStack Query een query als de browser offline is. Dan komt de fetch nooit bij de service worker, en blijft het skeleton eeuwig staan. Probeer het eerst zonder!

**Controleer:** open de app, zet in DevTools → Network "Offline" aan en herlaad. De app en de auto's zijn er nog. Kijk ook in Application → Cache Storage.

## 4. Een offline-banner

- [ ] Maak `hooks/useOnlineStatus.ts` met `useSyncExternalStore`. Luister naar de `online`- en `offline`-events van `window`, en lees `navigator.onLine`.

```typescript
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

// useSyncExternalStore: the React way to read a value that lives outside React
// (here: the browser's online status), without useEffect + useState.
export function useOnlineStatus() {
  return useSyncExternalStore(subscribe, () => navigator.onLine);
}
```


- [ ] Maak `components/OfflineBanner.tsx` die een melding toont als je offline bent.

```typescript
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <p className="banner" role="status">
      You're offline. Showing the cars from your last visit.
    </p>
  );
}
```



- [ ] Zet de banner in `Layout`, onder de navbar.
```html
<OfflineBanner />
```

> **Waarom `useSyncExternalStore`?** De online-status leeft buiten React. Deze hook is de React-manier om zo'n waarde te lezen, zonder `useEffect` + `useState`.

## 5. Online zetten met GitHub Pages

- [ ] Zet in `vite.config.ts` `base: process.env.BASE_PATH ?? "/"`: op GitHub Pages staat de app in een submap (`/<repo>/`).
- [ ] Geef de router dezelfde submap mee: `createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })`.
- [ ] Maak een workflow in `.github/workflows/` die de app bouwt met `BASE_PATH`, `index.html` kopieert naar `404.html` en publiceert met `actions/deploy-pages`.
- [ ] Zet op GitHub bij Settings → Pages de Source op "GitHub Actions".

> **Waarom `404.html`?** GitHub Pages kent de React-routes niet: een directe link naar `/cars/renault` zou een 404 geven. Door `index.html` ook als 404-pagina te gebruiken, neemt React Router het over.
> **Waarom GitHub Pages?** Een service worker werkt alleen via HTTPS (of op localhost), en dat regelt GitHub Pages.

**Controleer:** open de live URL op je telefoon, installeer de app, zet vliegtuigmodus aan en open hem opnieuw.

## 6. Een melding bij een nieuwe versie (needs improvement)

** Werkt nog niet goed op localhost **

- [ ] Activeer in VitePWA plugin `registerType: "prompt"`.
- [ ] Maak `components/UpdatePrompt.tsx` met `useRegisterSW()` uit `virtual:pwa-register/react`.

```typescript
import { useRegisterSW } from "virtual:pwa-register/react";

// Registers the service worker. When a new version has been deployed, the new service worker
// waits until the user clicks "Reload", so the app never changes underneath them.
export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    // The browser only checks for a new service worker on navigation; also check every minute
    // so an open tab notices a new deploy without a manual reload.
    onRegisteredSW(_swUrl, registration) {
      if (registration) setInterval(() => registration.update(), 5 * 1000);
    },
  });

  if (!needRefresh) return null;

  return (
    <div className="banner banner-update" role="status">
      <span>A new version is available .</span>
      <button className="banner-btn" onClick={() => updateServiceWorker(true)}>Reload</button>
      <button className="banner-btn banner-btn-ghost" onClick={() => setNeedRefresh(false)}>Later</button>
    </div>
  );
}
```

- [ ] Zet de melding ook in `Layout`.
```html
<UpdatePrompt />
```

**Controleer:** verander een tekst, bouw opnieuw en herlaad de preview. De melding verschijnt en Reload toont de nieuwe versie.
