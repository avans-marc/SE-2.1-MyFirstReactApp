import { carId, type Car } from "../data/cars";
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
