# TODO – Les 05: PWA

**Startpunt:** het eindresultaat van les 04.
**Eindresultaat:** een installeerbare app die na één bezoek ook offline werkt, met een offline-banner en een melding bij een nieuwe versie. Hij staat live op GitHub Pages.

> **Let op:** een service worker werkt niet met `npm run dev`. Test elke stap met `npm run build && npm run preview`, en kijk in Chrome DevTools → **Application**.

## 1. De plugin installeren

- [ ] `npm install -D vite-plugin-pwa`
- [ ] Voeg in `vite.config.ts` `VitePWA({ ... })` toe aan `plugins`.
- [ ] Voeg in `tsconfig.app.json` `"vite-plugin-pwa/react"` toe aan `types`.

## 2. Iconen en manifest

- [ ] `npm install -D @vite-pwa/assets-generator`
- [ ] Maak `pwa-assets.config.ts` met `minimal2023Preset` en `images: ["public/favicon.svg"]`.
- [ ] Voeg het script `"generate:icons": "pwa-assets-generator"` toe en voer het uit. Kijk welke PNG's er in `public/` bijkomen.
- [ ] Vul in de plugin `manifest` in: `name`, `short_name`, `theme_color`, `background_color`, `display: "standalone"` en de `icons`.
- [ ] Voeg in `index.html` een `apple-touch-icon` en een `theme-color` toe.

**Controleer:** in DevTools → Application → Manifest staan de naam en iconen zonder fouten, en de browser biedt aan om de app te installeren.

## 3. Offline werken

- [ ] Zet in `workbox.globPatterns` welke bestanden de service worker vooraf opslaat (JS, CSS, HTML, iconen).
- [ ] Voeg een `runtimeCaching`-regel toe voor `cars.json` met `handler: "NetworkFirst"` en `networkTimeoutSeconds: 3`.
- [ ] Zet in `main.tsx` bij de `QueryClient` de standaardoptie `networkMode: "offlineFirst"`.

> **Waarom `NetworkFirst`?** Online krijg je verse data, offline de laatst opgeslagen versie. Bespreek het verschil met `CacheFirst` en `StaleWhileRevalidate`.
> **Waarom `offlineFirst`?** Standaard pauzeert TanStack Query een query als de browser offline is. Dan komt de fetch nooit bij de service worker, en blijft het skeleton eeuwig staan. Probeer het eerst zonder!

**Controleer:** open de app, zet in DevTools → Network "Offline" aan en herlaad. De app en de auto's zijn er nog. Kijk ook in Application → Cache Storage.

## 4. Een offline-banner

- [ ] Maak `hooks/useOnlineStatus.ts` met `useSyncExternalStore`. Luister naar de `online`- en `offline`-events van `window`, en lees `navigator.onLine`.
- [ ] Maak `components/OfflineBanner.tsx` die een melding toont als je offline bent.
- [ ] Zet de banner in `Layout`, onder de navbar.

> **Waarom `useSyncExternalStore`?** De online-status leeft buiten React. Deze hook is de React-manier om zo'n waarde te lezen, zonder `useEffect` + `useState`.

## 5. Een melding bij een nieuwe versie

- [ ] Zet in de plugin `registerType: "prompt"`.
- [ ] Maak `components/UpdatePrompt.tsx` met `useRegisterSW()` uit `virtual:pwa-register/react`.
- [ ] Toon een melding met een Reload-knop (`updateServiceWorker(true)`) als `needRefresh` true is.
- [ ] Zet de melding ook in `Layout`.

**Controleer:** verander een tekst, bouw opnieuw en herlaad de preview. De melding verschijnt en Reload toont de nieuwe versie.

## 6. Online zetten met GitHub Pages

- [ ] Zet in `vite.config.ts` `base: process.env.BASE_PATH ?? "/"`: op GitHub Pages staat de app in een submap (`/<repo>/`).
- [ ] Geef de router dezelfde submap mee: `createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })`.
- [ ] Maak een workflow in `.github/workflows/` die de app bouwt met `BASE_PATH`, `index.html` kopieert naar `404.html` en publiceert met `actions/deploy-pages`.
- [ ] Zet op GitHub bij Settings → Pages de Source op "GitHub Actions".

> **Waarom `404.html`?** GitHub Pages kent de React-routes niet: een directe link naar `/cars/renault` zou een 404 geven. Door `index.html` ook als 404-pagina te gebruiken, neemt React Router het over.
> **Waarom GitHub Pages?** Een service worker werkt alleen via HTTPS (of op localhost), en dat regelt GitHub Pages.

**Controleer:** open de live URL op je telefoon, installeer de app, zet vliegtuigmodus aan en open hem opnieuw.
