import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "../api/cars";

export function useCars(search = "") {
  // search is part of the key → a new value automatically triggers a new fetch.
  // The brand pages call useCars() without a search, so they share the ["cars", ""] cache.
  const { data: cars = [], isPending, error } = useQuery({
    queryKey: ["cars", search],
    queryFn: () => fetchCars(search),
  });

  return { cars, isPending, error };
}
