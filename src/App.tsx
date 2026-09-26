import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider, useParams, useSearchParams, Link, Outlet, useOutletContext } from 'react-router-dom'
import './App.css'

type Car = { brand: string, model: string };

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

  const [cars, setCars] = useState<Car[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    async function load() {
      try {
        const res = await fetch('https://avans.blob.core.windows.net/cars-api/cars.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        await new Promise(resolve => setTimeout(resolve, 1500)); // TODO: remove - artificial delay to preview the loading skeleton
        setCars(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []); // lege array = één keer, bij mount


  if (error) return <span className="red">Something went wrong!</span>;

  if (loading) {
    return (
      <div className="page">
        <h1>Cars</h1>
        <BrandNavSkeleton />
       <Outlet context={{ cars }} />
      </div>
    );
  }

  // Take the brands, deduplicate (Set), and put in a new Array
  const brands = [...new Set(cars!.map(car => car.brand))];

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
      <Outlet context={{ cars }} />
    </div>
  )
}

function BrandNavSkeleton({ count = 5 }: { count?: number }) {
  return (
    <ul className="brand-nav" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <span className="brand-link skeleton-pill" />
        </li>
      ))}
    </ul>
  )
}

function CarsByBrand() {

  const { cars } = useOutletContext<{ cars: Car[] }>();

  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const model = searchParams.get('model');
  const carsOfBrand = cars ? cars.filter(car =>
    car.brand.toLowerCase() === slug?.toLowerCase() &&
    (!model || car.model.toLowerCase().includes(model.toLowerCase()))
  ) : [];

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
      <p className="subtitle">A small playground for React.</p>
      <Link className="btn" to="/cars">Cars</Link>
    </div>
  )
}

export default App
