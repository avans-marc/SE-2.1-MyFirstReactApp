# My First React App

Een kleine React + TypeScript + Vite app over auto's, die in vijf lessen stap voor stap groeit. Elke les is een losse, werkende app in een eigen map.

```bash
cd 01_routing
npm install
npm run dev
```

## Les 01: Routing

- **Alles in één `App.tsx`**, met een vaste lijst auto's: de focus ligt op routing, niet op bestanden of data.
- **Navbar in een layout route**, zodat hij op elke pagina staat zonder hem te herhalen.
- **`NavLink`** voor de navbar en merken, zodat je ziet waar je bent.
- **Nested routes** (`/cars/:slug`): de merken blijven staan als je een merk kiest.
- **Index route en 404-pagina**, zodat elke URL iets zinnigs toont.

## Les 02: Components

- **Opgesplitst in `pages/`, `components/` en `hooks/`**: elk bestand doet één ding, `App.tsx` bevat alleen de router.
- **Nieuw: `FavoriteButton`** zonder eigen state: data komt binnen via props, de klik gaat naar boven via `onToggle`.
- **Favorieten-state in de hook `useFavorites`**, zodat de logica los staat van de JSX.
- **`carId` (merk + model) als `key`**, omdat een modelnaam alleen niet uniek is.

## Les 03: Integration

- **Data van een online API** in plaats van een vaste lijst.
- **TanStack Query (`useCars`) in plaats van `useEffect` + `useState`**: laden, fouten en caching gaan vanzelf.
- **Pagina's halen de data zelf op**, in plaats van die via props door te geven: dankzij de cache wordt er maar één keer gefetcht.
- **Skeletons tijdens het laden**, zodat de pagina niet verspringt.
- **Orval (`npm run generate:api`)** genereert een API-client uit de OpenAPI-spec, als alternatief voor de handgeschreven `fetchCars`.

## Les 04: Forms

- **Zoekbalk op de homepage** met TanStack Form; de merkpagina's blijven hetzelfde, zonder zoekbalk.
- **`SearchBar` roept alleen `onSearch` aan**: de pagina bepaalt wat er met de zoekterm gebeurt.
- **De zoekterm zit in de `queryKey`**, dus een nieuwe zoekterm haalt vanzelf nieuwe data op.
- **Zoeken tijdens het typen met 250 ms debounce**, zodat niet elke toetsaanslag een fetch start.

## Les 05: PWA

Live: <https://avans-marc.github.io/SE-2.1-MyFirstReactApp/>

- **`vite-plugin-pwa`** maakt van de app een installeerbare PWA met een manifest en iconen (`npm run generate:icons`).
- **De service worker cachet de app en `cars.json`**, zodat de app na één bezoek ook offline werkt.
- **`networkMode: 'offlineFirst'`** in TanStack Query, anders wacht een query offline en komt hij nooit bij de cache van de service worker.
- **Een offline-banner** via `useSyncExternalStore`: de React-manier om een waarde van buiten React (de online-status) te lezen.
- **Een "nieuwe versie"-melding** in plaats van stil updaten, zodat de app niet onder de gebruiker verandert.
- **Automatisch online via GitHub Pages** (HTTPS is verplicht voor een service worker). Test lokaal met `npm run build && npm run preview`: met `npm run dev` is er geen service worker.
