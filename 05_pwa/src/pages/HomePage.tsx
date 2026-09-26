import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { CarList, CarListSkeleton } from "../components/CarList";
import { useCars } from "../hooks/useCars";
import { useFavorites } from "../hooks/useFavorites";

export function HomePage() {
  // The last submitted search term
  const [search, setSearch] = useState("");
  const { cars, isPending, error } = useCars(search);
  const { favorites, toggleFavorite } = useFavorites();

  if (error) return <span className="red">Something went wrong!</span>;

  return (
    <div className="page">
      <h1>Find a car</h1>
      <SearchBar onSearch={setSearch} />
      <div className="brand-section">
        {isPending ? (
          <CarListSkeleton count={5} />
        ) : cars.length === 0 ? (
          <p className="empty">No cars found for "{search}".</p>
        ) : (
          <CarList cars={cars} favorites={favorites} onToggleFavorite={toggleFavorite} />
        )}
      </div>
    </div>
  );
}
