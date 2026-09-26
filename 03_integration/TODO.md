# TODO – Les 03: Integration

**Startpunt:** het eindresultaat van les 02.
**Eindresultaat:** dezelfde app, maar de auto's komen van een online API: <https://avans.blob.core.windows.net/cars-api/cars.json>. Tijdens het laden zie je skeletons.

## 1. TanStack Query installeren

- [ ] `npm install @tanstack/react-query`
- [ ] Maak in `main.tsx` een `new QueryClient()` en zet `<QueryClientProvider client={queryClient}>` om `<App />`.

> **Waarom geen `useEffect` + `useState`?** Dan moet je zelf `loading`, `error` en de data bijhouden, en de linter waarschuwt voor `setState` in een effect. TanStack Query regelt laden, fouten en caching voor je.

## 2. Een fetch-functie

- [ ] Hernoem `src/data/` naar `src/api/handcoded/`, en haal de vaste array `cars` en `brands` weg. `Car` en `carId` blijven.
- [ ] Schrijf `async function fetchCars(): Promise<Car[]>` die de URL ophaalt met `fetch`.
- [ ] Gooi een fout als `res.ok` false is: `throw new Error(`HTTP ${res.status}`)`. Anders ziet TanStack Query een 404 niet als fout.
- [ ] Optioneel: voeg een kunstmatige vertraging toe om het laden te kunnen zien: `await new Promise(r => setTimeout(r, 1500))`.

## 3. Een hook: `useCars`

- [ ] Maak `hooks/useCars.ts` met `useQuery({ queryKey: ["cars"], queryFn: fetchCars })`.
- [ ] Geef `{ cars, isPending, error }` terug. Gebruik `data: cars = []` zodat `cars` nooit `undefined` is.

## 4. De pagina's aanpassen

- [ ] `CarsPage`: haal de auto's op met `useCars()` en bereken daaruit de merken (dezelfde `new Set`-truc als in les 01).
- [ ] `CarsPage`: toon een foutmelding als `error` gevuld is.
- [ ] `BrandPage`: gebruik ook `useCars()` in plaats van de oude import van `cars`.

> **Twee keer `useCars()`, maar één fetch.** Beide pagina's gebruiken de key `["cars"]`, dus de tweede leest uit de cache. Controleer dat in het Network-tabblad. Je hoeft de data dus niet via props of `<Outlet context>` door te geven.

**Controleer:** de merken en modellen komen nu van de API (er staan meer merken dan in les 02).

## 5. Skeletons tijdens het laden

- [ ] Maak in `BrandNav.tsx` een `BrandNavSkeleton`: een paar lege "pillen" met de class `skeleton-pill`.
- [ ] Maak in `CarList.tsx` een `CarListSkeleton`: een paar lege rijen met de class `skeleton-line`.
- [ ] Toon ze met `isPending ? <Skeleton /> : <echte inhoud>`.
- [ ] Voeg de CSS toe: een grijze balk met een bewegende `linear-gradient` (zie `App.css`).

> **Waarom dezelfde classes als het echte component?** Dan heeft het skeleton dezelfde vorm en grootte, en verspringt de pagina niet als de data binnenkomt.

## 6. Een gegenereerde API-client met Orval (extra)

- [ ] `npm install -D orval`
- [ ] Maak `orval.config.ts` met als input de spec (<https://avans.blob.core.windows.net/cars-api/openapi.yaml>), `client: "react-query"`, `httpClient: "fetch"` en als output `src/api/generated/`.
- [ ] Voeg in `package.json` het script `"generate:api": "orval"` toe en voer het uit.
- [ ] Bekijk wat er gegenereerd is: `getCars()`, `useGetCars()` en het type `Car`.
- [ ] Probeer in `useCars` de gegenereerde `getCars()` als `queryFn`. Let op: die geeft `{ data, status }` terug, de auto's zitten in `response.data`.

> **Bespreek:** wat is het voordeel van een client die uit de spec gegenereerd wordt? (Types en URL's kloppen altijd met de API.) En het nadeel? (Minder controle, en een 404 is geen fout maar een gewone response.)

**Controleer:** `npm run lint` geeft geen fouten (let op ongebruikte imports als je iets in commentaar zet).
