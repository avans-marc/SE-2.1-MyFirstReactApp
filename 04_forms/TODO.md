# TODO – Les 04: Forms

**Startpunt:** het eindresultaat van les 03.
**Eindresultaat:** de homepage is een zoekpagina: typ een merk of model en de resultaten verschijnen vanzelf. De pagina's onder `/cars` blijven hetzelfde, zonder zoekbalk.

## 1. TanStack Form installeren

- [ ] `npm install @tanstack/react-form`

## 2. Een component `SearchBar`

- [ ] Maak `components/SearchBar.tsx` met één prop: `onSearch: (query: string) => void`.
- [ ] Maak een formulier met `useForm({ defaultValues: { query: "" }, onSubmit })`. Roep in `onSubmit` `onSearch(value.query)` aan.
- [ ] Zet in de JSX een `<form>` met `onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}`.
- [ ] Koppel de input aan het veld met `<form.Field name="query">`, en gebruik daarin `field.state.value`, `field.handleChange` en `field.handleBlur`.
- [ ] Voeg een Search-knop toe (`type="submit"`).

> **Waarom `e.preventDefault()`?** Anders stuurt de browser het formulier zelf op en herlaadt de pagina.
> **Waarom alleen `onSearch`?** `SearchBar` weet niet wat er met de zoekterm gebeurt. Dat bepaalt de pagina (events up, net als `FavoriteButton` in les 02).

## 3. De homepage wordt een zoekpagina

- [ ] Maak in `HomePage` een state `const [search, setSearch] = useState("")`.
- [ ] Zet `<SearchBar onSearch={setSearch} />` op de pagina.
- [ ] Toon de resultaten met `CarList` (hergebruikt uit les 02!), met `CarListSkeleton` tijdens het laden.
- [ ] Toon "No cars found" als de lijst leeg is.
- [ ] Gebruik `useFavorites()` zodat de sterren ook hier werken.

## 4. De zoekterm naar de query

- [ ] Geef `fetchCars` een parameter `search = ""`, en filter de auto's op merk of model (hoofdletterongevoelig).
- [ ] Zet het filteren in een aparte functie `filterCars(cars, search)`, zodat je hem ook met de gegenereerde Orval-client kunt gebruiken.
- [ ] Geef `useCars` ook een parameter `search = ""`, en zet die in de key: `queryKey: ["cars", search]`, `queryFn: () => fetchCars(search)`.

> **Je roept de fetch nooit zelf aan.** Verandert `search`, dan verandert de key, en haalt TanStack Query zelf nieuwe data op. Zoek je iets wat je al eerder zocht, dan komt het direct uit de cache.
> **Waarom de standaardwaarde `""`?** Dan hoeven `CarsPage` en `BrandPage` niet te veranderen: `useCars()` blijft werken.
> **Waarom filteren in de client?** De API is een statisch bestand. Een echte API zou de zoekterm als query parameter krijgen.

**Controleer:** zoeken op "bmw" toont alleen BMW's. Zoek daarna iets anders en dan weer "bmw": de tweede keer is er geen skeleton.

## 5. Zoeken tijdens het typen, met debounce

- [ ] Voeg aan `<form.Field>` een `listeners`-prop toe met `onChange: ({ value }) => onSearch(value)`.
- [ ] Voeg `onChangeDebounceMs: 250` toe.

> **Waarom debounce?** Zonder debounce start elke toetsaanslag een fetch: "bmw" typen is dan drie requests. Met debounce wacht het formulier tot je 250 ms stopt met typen. Probeer het zonder, en kijk in het Network-tabblad.

**Controleer:** tijdens het typen verschijnen de resultaten vanzelf. Enter of de knop zoeken direct. De pagina's onder `/cars` werken nog, zonder zoekbalk.
