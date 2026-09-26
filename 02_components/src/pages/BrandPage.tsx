import { useParams, useSearchParams } from "react-router-dom";
import { CarList } from "../components/CarList";
import { cars } from "../data/cars";
import { useFavorites } from "../hooks/useFavorites";

export function BrandPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { favorites, toggleFavorite } = useFavorites();

  const model = searchParams.get("model");
  const carsOfBrand = cars.filter((car) =>
    car.brand.toLowerCase() === slug?.toLowerCase() &&
    (!model || car.model.toLowerCase().includes(model.toLowerCase()))
  );

  return (
    <div className="brand-section">
      <h2>{slug?.toUpperCase()} Cars</h2>
      {carsOfBrand.length === 0 ? (
        <p className="empty">No models found.</p>
      ) : (
        <CarList cars={carsOfBrand} favorites={favorites} onToggleFavorite={toggleFavorite} />
      )}
    </div>
  );
}
