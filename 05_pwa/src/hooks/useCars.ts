import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "../api/handcoded/cars";
// import { fetchCars, filterCars } from "../api/handcoded/cars";
// import { getCars } from "../api/generated/cars";

export function useCars(search = "") {
  // search is part of the key → a new value automatically triggers a new fetch.
  // The brand pages call useCars() without a search, so they share the ["cars", ""] cache.
  const { data: cars = [], isPending, error } = useQuery({
    queryKey: ["cars", search],
    queryFn: () => fetchCars(search),
    // Alternative: the client Orval generated from the OpenAPI spec (npm run generate:api)
    // queryFn: async () => {
    //   const response = await getCars();
    //   // A 404 is a normal response for the generated fetch client, not an error
    //   if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
    //   return filterCars(response.data, search);
    // },
  });

  return { cars, isPending, error };
}
