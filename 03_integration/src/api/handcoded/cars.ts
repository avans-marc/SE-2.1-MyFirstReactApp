export type Car = { brand: string; model: string };

// Unique per car: two brands can have a model with the same name
export function carId(car: Car) {
  return `${car.brand}-${car.model}`;
}

export async function fetchCars(): Promise<Car[]> {
  const res = await fetch("https://avans.blob.core.windows.net/cars-api/cars.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const cars: Car[] = await res.json();
  await new Promise(resolve => setTimeout(resolve, 1500)); // Artificial delay to preview the loading skeleton
  return cars;
}
