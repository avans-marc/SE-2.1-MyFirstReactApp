import { Outlet } from "react-router-dom";
import { BrandNav, BrandNavSkeleton } from "../components/BrandNav";
import { useCars } from "../hooks/useCars";

export function CarsPage() {
  const { cars, isPending, error } = useCars();

  if (error) return <span className="red">Something went wrong!</span>;

  // Take the brands, deduplicate (Set), and put in a new Array
  const brands = [...new Set(cars.map((car) => car.brand))];

  return (
    <div className="page">
      <h1>Cars</h1>
      {isPending ? <BrandNavSkeleton /> : <BrandNav brands={brands} />}
      {/* The nested route (index or :slug) renders here */}
      <Outlet />
    </div>
  );
}
