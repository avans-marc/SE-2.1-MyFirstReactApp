# My First React App

Een kleine React + TypeScript + Vite speeltuin om te oefenen met React Router concepten: nested routes, route params, search params en het "liften" van state.

## Aan de slag

```bash
npm install
npm run dev
```

De app draait op [http://localhost:5173](http://localhost:5173).

## Voorbeeld-URL's

| URL | Wat je te zien krijgt |
| --- | --- |
| `/` | Homepage met een link naar de app |
| `/cars` | Lijst met automerken (nested route outlet eronder) |
| `/cars/renault` | Modellen van Renault, via de `:slug` route param |
| `/cars/opel` | Modellen van Opel |
| `/cars/renault?model=megane` | Renault-modellen gefilterd op de `model` search param |

## Components: props down, events up

- **`Cars`** rendert de lijst met merk-links en een `<Outlet />` voor de nested `:slug` route.
- **`CarsByBrand`** leest `slug` (`useParams`) en `model` (`useSearchParams`) uit de URL om `cars` te filteren, en beheert de `favorites` state (`useState<Set<string>>`). Hier leeft dus de state — in het component dat er het dichtst bij zit en het nodig heeft.
- **`CarItem`** is een weergave component. Het ontvangt `car` en `isFavorite` als props (data stroomt naar beneden) en roept de `onToggleFavorite` callback-prop aan wanneer op de ster-knop wordt geklikt (een event stroomt naar boven). Het component heeft zelf geen state — `CarsByBrand` past `favorites` aan en rendert `CarItem` opnieuw met de nieuwe `isFavorite`-waarde.

Deze eenrichtingsflow (state naar beneden als props, wijzigingen naar boven als callbacks) is een kernpatroon.
