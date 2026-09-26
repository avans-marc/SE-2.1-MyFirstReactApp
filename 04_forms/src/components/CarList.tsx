import { carId, type Car } from "../api/cars";
import { FavoriteButton } from "./FavoriteButton";

type CarListProps = {
  cars: Car[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
};

export function CarList({ cars, favorites, onToggleFavorite }: CarListProps) {
  return (
    <ul className="car-list">
      {cars.map((car) => (
        <CarItem
          key={carId(car)}
          car={car}
          isFavorite={favorites.has(carId(car))}
          onToggleFavorite={() => onToggleFavorite(carId(car))}
        />
      ))}
    </ul>
  );
}

type CarItemProps = {
  car: Car;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

function CarItem({ car, isFavorite, onToggleFavorite }: CarItemProps) {
  const name = `${car.brand} ${car.model}`;

  return (
    <li className="car-item">
      <span className="car-model">{name}</span>
      <FavoriteButton label={name} isFavorite={isFavorite} onToggle={onToggleFavorite} />
    </li>
  );
}

export function CarListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <ul className="car-list" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="car-item">
          <span className="skeleton-line" style={{ width: `${40 + (i % 3) * 15}%` }} />
          <span className="skeleton-line skeleton-star" />
        </li>
      ))}
    </ul>
  );
}
