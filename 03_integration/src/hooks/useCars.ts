import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "../api/cars";

export function useCars() {
  // Every component that calls useCars() shares the same cached result for this key:
  // CarsPage and BrandPage both use it, but the cars are only fetched once.
  const { data: cars = [], isPending, error } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });

  return { cars, isPending, error };
}
