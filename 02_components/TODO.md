# TODO – Les 02: Components

**Startpunt:** het eindresultaat van les 01 (alles in `App.tsx`).
**Eindresultaat:** dezelfde app, opgesplitst in bestanden, met een favoriet-knop bij elke auto.

De app moet er na stap 1 t/m 3 precies hetzelfde uitzien als in les 01. Pas in stap 4 komt er iets nieuws bij.

## 1. De data verhuizen

- [ ] Maak `src/data/cars.ts` en verplaats daarheen: het type `Car`, de array `cars` en `brands`.
- [ ] Zet `export` voor alles wat je verplaatst, en importeer het waar het nodig is.

> **Waarom?** Data en weergave los van elkaar. In les 03 hoeft dan alleen dit bestand te veranderen als de data van een API komt.

## 2. Pagina's in `src/pages/`

Maak voor elke route een eigen bestand, en verplaats de component daarheen:

- [ ] `HomePage.tsx` (was `Home`)
- [ ] `CarsPage.tsx` (was `Cars`)
- [ ] `BrandPage.tsx` (was `CarsByBrand`)
- [ ] `NotFoundPage.tsx` (was `NotFound`)

**Controleer:** `App.tsx` bevat nu alleen nog de imports, de router en `App`.

## 3. Componenten in `src/components/`

- [ ] `NavBar.tsx`: de `<nav>` met de twee `NavLink`s.
- [ ] `Layout.tsx`: `<NavBar />` + `<Outlet />`.
- [ ] `BrandNav.tsx`: de lijst met merken. Geef de merken mee als prop: `<BrandNav brands={brands} />`.
- [ ] `CarList.tsx`: de `<ul>` met auto's. Geef de auto's mee als prop: `<CarList cars={carsOfBrand} />`.
- [ ] Geef elke component een type voor zijn props, bijvoorbeeld `type BrandNavProps = { brands: string[] }`.

> **Waarom props?** Een component dat zijn data via props krijgt, weet niet waar die vandaan komt. Dat maakt het herbruikbaar (dat zie je in les 04, waar `CarList` ook op de homepage staat).

**Controleer:** de app werkt precies zoals aan het begin van deze les.

## 4. Een favoriet-knop (props down, events up)

- [ ] Maak `components/FavoriteButton.tsx` met de props `label`, `isFavorite` en `onToggle`.
- [ ] Toon ★ als `isFavorite` true is, anders ☆. Roep `onToggle` aan bij een klik.
- [ ] Geef de knop een `aria-label`, bijvoorbeeld `Add ${label} to favorites`.
- [ ] Splits in `CarList.tsx` een component `CarItem` af (één `<li>`), en zet daarin de `FavoriteButton`.

> **Belangrijk:** `FavoriteButton` heeft *geen* eigen state. Hij krijgt `isFavorite` binnen (data naar beneden) en meldt een klik via `onToggle` (event naar boven).

## 5. De state in een custom hook

- [ ] Maak `hooks/useFavorites.ts` met een `useState<Set<string>>(new Set())`.
- [ ] Maak daarin een functie `toggleFavorite(id)` die het id toevoegt of verwijdert. Maak een *nieuwe* `Set`, pas de oude niet aan.
- [ ] Geef `{ favorites, toggleFavorite }` terug.
- [ ] Gebruik de hook in `BrandPage`, en geef `favorites` en `toggleFavorite` als props door aan `CarList`.

> **Waarom een nieuwe `Set`?** React ziet alleen dat state verandert als je een nieuw object meegeeft. `favorites.add(...)` op de oude Set doet niets zichtbaars.

## 6. Een unieke key

- [ ] Maak in `data/cars.ts` een functie `carId(car)` die `${car.brand}-${car.model}` teruggeeft.
- [ ] Gebruik `carId(car)` als `key` in de lijst én als id voor de favorieten.

> **Waarom?** Twee merken kunnen een model met dezelfde naam hebben. Dan zou de modelnaam alleen als key dubbel zijn, en zouden ze één ster delen.

**Controleer:** je kunt sterren aan- en uitzetten. Ga naar een ander merk en terug: de sterren staan er nog. Ga naar Home en terug: ze zijn weg. Bespreek waarom (de state leeft in `BrandPage`).
