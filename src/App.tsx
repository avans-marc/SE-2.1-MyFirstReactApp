import { useState } from 'react'
import { createBrowserRouter, RouterProvider, useParams, useSearchParams, Link, Outlet } from 'react-router-dom'
import './App.css'

type Car = { brand: string, model: string };

const cars: Car[] = [
  { brand: "Renault", model: "Megane" },
  { brand: "Renault", model: "Scenic" },
  { brand: "Opel", model: "Corsa E" },
  { brand: "BMW", model: "X5" },
];

const brands = [...new Set(cars.map(car => car.brand))];

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/cars",
    element: <Cars />,
    children: [
      { path: ":slug", element: <CarsByBrand /> }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

function Cars() {
  return (
    <div className="page">
      <h1>Cars</h1>
      <ul className="brand-nav">
        {brands.map(brand => (
          <li key={brand}>
            <Link className="brand-link" to={`/cars/${brand.toLowerCase()}`}>{brand}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  )
}

function CarsByBrand() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const model = searchParams.get('model');
  const carsOfBrand = cars.filter(car =>
    car.brand.toLowerCase() === slug?.toLowerCase() &&
    (!model || car.model.toLowerCase().includes(model.toLowerCase()))
  );

  function toggleFavorite(model: string) {
    setFavorites(current => {
      const next = new Set(current);
      if (next.has(model)) {
        next.delete(model);
      } else {
        next.add(model);
      }
      return next;
    });
  }

  return (
    <div className="brand-section">
      <h2>{ slug?.toUpperCase() } Cars</h2>
      {carsOfBrand.length === 0 ? (
        <p className="empty">No models found.</p>
      ) : (
        <ul className="car-list">
        {
          carsOfBrand.map(car => (
            <CarItem
              key={car.model}
              car={car}
              isFavorite={favorites.has(car.model)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

type CarItemProps = {
  car: Car,
  isFavorite: boolean,
  onToggleFavorite: (model: string) => void,
}

function CarItem({ car, isFavorite, onToggleFavorite }: CarItemProps) {
  return (
    <li className="car-item">
      <span className="car-model">{ car.model }</span>
      <button
        className={`favorite-btn${isFavorite ? ' is-active' : ''}`}
        onClick={() => onToggleFavorite(car.model)}
        aria-label={isFavorite ? `Remove ${car.model} from favorites` : `Add ${car.model} to favorites`}
      >
        { isFavorite ? '★' : '☆' }
      </button>
    </li>
  )
}

function Home() {
  return (
    <div className="page page-home">
      <h1>Homepage</h1>
      <p className="subtitle">A small playground for React Router concepts: nested routes, params, search params and state.</p>
      <Link className="btn" to="/cars">Cars</Link>
    </div>
  )
}

export default App
