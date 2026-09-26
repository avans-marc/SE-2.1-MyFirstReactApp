# My First React App

Een kleine React + TypeScript + Vite app over auto's, die in vier lessen stap voor stap groeit. Elke les staat in een eigen map en is een complete, werkende app. Elke les bouwt voort op de vorige: vergelijk twee mappen naast elkaar om precies te zien wat er nieuw is.

| Les | Map | Onderwerp |
| --- | --- | --- |
| 01 | [`01_routing`](01_routing) | Routing: navbar, layout route, merkpagina's |
| 02 | [`02_components`](02_components) | Components: opsplitsen in bestanden, `FavoriteButton` |
| 03 | [`03_integration`](03_integration) | Data ophalen met TanStack Query |
| 04 | [`04_forms`](04_forms) | Formulieren: een zoekbalk op de homepage |

## Aan de slag

Elke les is een losse app. Ga naar de map van de les en start die:

```bash
cd 01_routing
npm install
npm run dev
```

De app draait op [http://localhost:5173](http://localhost:5173).

---

## Les 01: Routing

**Map:** [`01_routing`](01_routing), alles staat nog in één bestand: [`src/App.tsx`](01_routing/src/App.tsx).

Je bouwt een app met meerdere pagina's zonder dat de browser de pagina herlaadt. De auto's staan nog als vaste lijst in de code.

### Wat je leert

- **`createBrowserRouter` en `RouterProvider`**: je beschrijft alle routes op één plek, als een boom van objecten.
- **Layout route**: een route zonder `path` met `<Layout />` als element. Die tekent de navbar één keer en zet met `<Outlet />` de huidige pagina eronder. Zo hoef je de navbar niet op elke pagina te herhalen.
- **`NavLink` vs `Link`**: `NavLink` krijgt automatisch de class `active` als zijn route actief is. Zo licht in de navbar het huidige menu-item op, en bij de merken het huidige merk. Op `/` staat `end`, anders zou "Home" op elke pagina actief zijn (elk pad begint met `/`).
- **Nested routes**: `/cars` is de ouder, `/cars/:slug` het kind. Het kind wordt getekend op de plek van de `<Outlet />` in `Cars`, dus de lijst met merken blijft staan als je een merk kiest.
- **Index route**: `{ index: true }` is wat er in de `<Outlet />` staat als je op `/cars` zit zonder merk.
- **Route params** (`useParams`): `:slug` in het pad wordt `slug` in je component.
- **Search params** (`useSearchParams`): `?model=megane` filtert de modellen.
- **Catch-all route**: `path: "*"` vangt elke onbekende URL op en toont een 404-pagina.

### Probeer deze URL's

| URL | Wat je te zien krijgt |
| --- | --- |
| `/` | Homepage |
| `/cars` | Lijst met merken, met "Pick a brand above." eronder (index route) |
| `/cars/renault` | Modellen van Renault, via de `:slug` route param |
| `/cars/renault?model=megane` | Renault-modellen gefilterd op de `model` search param |
| `/iets-dat-niet-bestaat` | 404-pagina |

---

## Les 02: Components

**Map:** [`02_components`](02_components)

Dezelfde app als in les 01, maar opgesplitst in kleine, herbruikbare componenten, elk in een eigen bestand. En er komt een favoriet-knop bij.

### Mappenstructuur

```
src/
  App.tsx              ← alleen de router
  data/cars.ts         ← Car type, de vaste lijst met auto's, carId()
  pages/               ← één component per route
    HomePage.tsx
    CarsPage.tsx
    BrandPage.tsx
    NotFoundPage.tsx
  components/          ← bouwstenen die pagina's gebruiken
    Layout.tsx
    NavBar.tsx
    BrandNav.tsx
    CarList.tsx        ← CarList + CarItem
    FavoriteButton.tsx
  hooks/
    useFavorites.ts    ← favorites state + toggleFavorite
```

### Wat je leert

- **Props down, events up.** `FavoriteButton` heeft geen eigen state. Het krijgt `isFavorite` binnen als prop (data stroomt naar beneden) en roept `onToggle` aan bij een klik (een event stroomt naar boven). De state leeft hoger op, in `BrandPage`, die de knop daarna opnieuw tekent met de nieuwe waarde.
- **Componenten samenstellen.** `BrandPage` → `CarList` → `CarItem` → `FavoriteButton`. Elk component doet één ding, en de pagina leest bijna als een zin.
- **Custom hook.** `useFavorites()` haalt de state-logica uit het component. Een hook is gewoon een functie die met `use` begint en zelf hooks gebruikt.
- **Een goede `key`.** Een lijst heeft een unieke `key` per item nodig. Alleen de modelnaam is niet genoeg (twee merken kunnen een model met dezelfde naam hebben), dus `carId(car)` combineert merk en model.

---

## Les 03: Integration (TanStack Query)

**Map:** [`03_integration`](03_integration)

De auto's komen nu van een online API: <https://avans.blob.core.windows.net/cars-api/cars.json>. De routes en pagina's blijven hetzelfde als in les 02.

### Wat verandert er

- `data/cars.ts` wordt [`api/cars.ts`](03_integration/src/api/cars.ts) met een `fetchCars()` functie.
- Nieuwe hook [`useCars()`](03_integration/src/hooks/useCars.ts) die `useQuery` gebruikt.
- [`main.tsx`](03_integration/src/main.tsx) zet een `QueryClientProvider` om de app heen. Die bewaart de cache voor alle queries.
- Tijdens het laden zie je skeletons: `BrandNavSkeleton` en `CarListSkeleton`.

### Wat je leert

- **Waarom geen `useEffect` + `useState`?** Dan moet je zelf `loading`, `error` en de data bijhouden, en fetch je opnieuw bij elke mount. `useQuery` doet dat allemaal voor je en geeft `data`, `isPending` en `error` terug.
- **De `queryKey` is het adres van de cache.** `CarsPage` en `BrandPage` roepen allebei `useCars()` aan met de key `["cars"]`. De auto's worden maar één keer opgehaald; de tweede aanroep leest uit de cache. Je hoeft de data dus niet via props of `<Outlet context>` door te geven.
- **Een standaardwaarde.** `const { data: cars = [] } = useQuery(...)`: `cars` is zo nooit `undefined`, ook niet tijdens het laden.
- **Laden en fouten tonen.** `isPending ? <Skeleton /> : <echte inhoud>`, en een melding als `error` gevuld is.

> `fetchCars()` wacht expres 1,5 seconde, zodat je de skeletons kunt zien. Haal die regel weg om de echte snelheid te zien.

---

## Les 04: Forms (TanStack Form)

**Map:** [`04_forms`](04_forms)

De homepage wordt een zoekpagina: typ een merk of model en klik op Search. De merk- en modelpagina's onder `/cars` blijven werken zoals in les 03, maar daar staat geen zoekbalk.

### Wat verandert er

- Nieuw component [`SearchBar`](04_forms/src/components/SearchBar.tsx) met `useForm` van TanStack Form.
- [`HomePage`](04_forms/src/pages/HomePage.tsx) toont de zoekbalk en de resultaten.
- `fetchCars(search)` en `useCars(search)` krijgen een optionele zoekterm.

### Wat je leert

- **Een formulier met TanStack Form.** `useForm` beheert de waarden van het formulier. `<form.Field name="query">` koppelt een input aan een veld via `field.state.value`, `field.handleChange` en `field.handleBlur`. `onSubmit` krijgt alle waarden in één keer.
- **Het component weet niet wat er met de zoekterm gebeurt.** `SearchBar` roept alleen `onSearch(query)` aan (events up). `HomePage` beslist wat ermee gebeurt.
- **Een formulier aan een query koppelen.** Je roept de fetch niet zelf aan. `onSearch` zet de state `search`, en die zit in de `queryKey` (`["cars", search]`). Verandert de key, dan haalt TanStack Query automatisch nieuwe data op. Zoek je iets wat je al eerder zocht, dan komt het direct uit de cache.
- **Waarom een aparte `search` state?** Zou je de waarde van het invoerveld direct in de key stoppen, dan start elke toetsaanslag een nieuwe fetch. Met een aparte state gebeurt dat alleen bij Submit.
- **Caches delen tussen pagina's.** De merkpagina's roepen `useCars()` aan zonder zoekterm (key `["cars", ""]`). Dat is dezelfde cache als de homepage bij het eerste laden: ga je van `/` naar `/cars`, dan zijn de auto's er meteen.
