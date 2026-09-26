import { useParams, useSearchParams } from "react-router-dom";
import { CarList, CarListSkeleton } from "../components/CarList";
import { useCars } from "../hooks/useCars";
import { useFavorites } from "../hooks/useFavorites";

export function BrandPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { cars, isPending } = useCars(); // same cache as CarsPage: no second fetch
  const { favorites, toggleFavorite } = useFavorites();

  const model = searchParams.get("model");
  const carsOfBrand = cars.filter((car) =>
    car.brand.toLowerCase() === slug?.toLowerCase() &&
    (!model || car.model.toLowerCase().includes(model.toLowerCase()))
  );

  return (
    <div className="brand-section">
      <h2>{slug?.toUpperCase()} Cars</h2>
      {isPending ? (
        <CarListSkeleton />
      ) : carsOfBrand.length === 0 ? (
        <p className="empty">No models found.</p>
      ) : (
        <CarList cars={carsOfBrand} favorites={favorites} onToggleFavorite={toggleFavorite} />
      )}
    </div>
  );
}
