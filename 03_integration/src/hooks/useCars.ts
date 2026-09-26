import { useQuery } from "@tanstack/react-query";
// import { fetchCars } from "../api/handcoded/cars";
import { getCars } from "../api/generated/cars";
import { fetchCars } from "../api/handcoded/cars";

export function useCars() {
  // Every component that calls useCars() shares the same cached result for this key:
  // CarsPage and BrandPage both use it, but the cars are only fetched once.
  const { data: cars = [], isPending, error } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars
    // queryFn: async() => { 
    //   const response =  await getCars()
    //   return response.data; 
    // },
  });

  return { cars, isPending, error };
}
