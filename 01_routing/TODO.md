# TODO – Les 01: Routing

**Startpunt:** een leeg Vite-project (`npm create vite@latest` → React + TypeScript).
**Eindresultaat:** een app met een navbar, een homepage, een lijst met merken en per merk een pagina met modellen.

Alles gebeurt in deze les in één bestand: `src/App.tsx`.

## 1. React Router installeren

- [ ] Installeer de router: `npm install react-router-dom`
- [ ] Maak `src/App.tsx` leeg en verwijder `src/App.css`. Alle styling staat in `src/index.css` (die importeert `main.tsx` al).

## 2. De data

- [ ] Maak een type `Car` met `brand` en `model` (beide `string`).
- [ ] Maak een array `cars: Car[]` met een paar auto's van minstens drie merken.
- [ ] Maak een lijst `brands` met elk merk maar één keer. Tip: `[...new Set(cars.map(car => car.brand))]`.

> **Waarom een vaste lijst?** Zo gaat deze les alleen over routing. Data ophalen van een API komt in les 03.

## 3. De eerste routes

- [ ] Maak een router met `createBrowserRouter([...])` en geef die aan `<RouterProvider router={router} />` in `App`.
- [ ] Maak een component `Home` met een titel en een `<Link to="/cars">`.
- [ ] Maak een component `Cars` dat alle merken toont.
- [ ] Voeg de routes `/` → `<Home />` en `/cars` → `<Cars />` toe.

**Controleer:** `/` en `/cars` werken, en de link brengt je van de ene naar de andere pagina *zonder* dat de pagina herlaadt (kijk naar het Network-tabblad).

## 4. Een navbar met een layout route

- [ ] Maak een component `Layout` met een `<nav>` en daaronder `<Outlet />`.
- [ ] Zet alle routes als `children` onder één route zonder `path`, met `element: <Layout />`.
- [ ] Gebruik in de navbar `<NavLink>` in plaats van `<Link>`, voor Home en Cars.
- [ ] Zet `end` op de NavLink naar `/`.

> **Waarom een layout route?** De navbar staat zo op één plek, en blijft staan als je van pagina wisselt.
> **Waarom `end`?** Elk pad begint met `/`. Zonder `end` is "Home" dus altijd actief.

**Controleer:** het actieve menu-item licht op (de class `active` staat erop, zie DevTools).

## 5. Een pagina per merk (nested route + route param)

- [ ] Maak de merken in `Cars` klikbaar: `<NavLink to={`/cars/${brand.toLowerCase()}`}>`.
- [ ] Voeg onder `/cars` een child route toe: `{ path: ":slug", element: <CarsByBrand /> }`.
- [ ] Zet `<Outlet />` in `Cars`, onder de lijst met merken.
- [ ] Lees in `CarsByBrand` het merk uit de URL met `const { slug } = useParams()`.
- [ ] Filter `cars` op dat merk (hoofdletterongevoelig!) en toon de modellen.
- [ ] Toon "No models found." als de lijst leeg is.

**Controleer:** op `/cars/renault` staan de merken bovenaan en de Renault-modellen eronder. Klik je een ander merk, dan verandert alleen het onderste deel.

## 6. Filteren met search params

- [ ] Lees `?model=...` uit de URL met `const [searchParams] = useSearchParams()` en `searchParams.get("model")`.
- [ ] Filter de modellen ook op die waarde, als hij is ingevuld.

**Controleer:** `/cars/renault?model=meg` toont alleen de Megane.

## 7. Index route en 404

- [ ] Voeg onder `/cars` een index route toe: `{ index: true, element: <p>Pick a brand above.</p> }`.
- [ ] Voeg als laatste route `{ path: "*", element: <NotFound /> }` toe, met een link terug naar Home.

**Controleer:** `/cars` toont de hint, en `/bestaat-niet` toont de 404-pagina (met de navbar erboven).
