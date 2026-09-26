export type Car = { brand: string; model: string };

// Unique per car: two brands can have a model with the same name
export function carId(car: Car) {
  return `${car.brand}-${car.model}`;
}

export async function fetchCars(search = ""): Promise<Car[]> {
  const res = await fetch("https://avans.blob.core.windows.net/cars-api/cars.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const cars: Car[] = await res.json();
  await new Promise(resolve => setTimeout(resolve, 1500)); // Artificial delay to preview the loading skeleton

  // The API is a static JSON file, so we filter here.
  // A real API would take the search term as a query parameter instead.
  const q = search.trim().toLowerCase();
  return q
    ? cars.filter((x) => x.brand.toLowerCase().includes(q) || x.model.toLowerCase().includes(q))
    : cars;
}
