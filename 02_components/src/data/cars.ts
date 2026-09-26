export type Car = { brand: string; model: string };

export const cars: Car[] = [
  { brand: "Renault", model: "Megane" },
  { brand: "Renault", model: "Scenic" },
  { brand: "Renault", model: "Clio" },
  { brand: "Opel", model: "Corsa E" },
  { brand: "Opel", model: "Astra" },
  { brand: "BMW", model: "X5" },
  { brand: "BMW", model: "3 Series" },
];

// Take the brands, deduplicate (Set), and put in a new Array
export const brands = [...new Set(cars.map((car) => car.brand))];

// Unique per car: two brands can have a model with the same name
export function carId(car: Car) {
  return `${car.brand}-${car.model}`;
}
