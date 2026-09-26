import { createBrowserRouter, RouterProvider, Link, NavLink, Outlet, useParams, useSearchParams } from 'react-router-dom'
import './App.css'

type Car = { brand: string, model: string };

const cars: Car[] = [
  { brand: "Renault", model: "Megane" },
  { brand: "Renault", model: "Scenic" },
  { brand: "Renault", model: "Clio" },
  { brand: "Opel", model: "Corsa E" },
  { brand: "Opel", model: "Astra" },
  { brand: "BMW", model: "X5" },
  { brand: "BMW", model: "3 Series" },
];

// Take the brands, deduplicate (Set), and put in a new Array
const brands = [...new Set(cars.map(car => car.brand))];

const router = createBrowserRouter([
  {
    // Layout route: no path, it wraps every page with the navbar
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/cars",
        element: <Cars />,
        children: [
          { index: true, element: <p className="empty">Pick a brand above.</p> },
          { path: ":slug", element: <CarsByBrand /> }
        ]
      },
      { path: "*", element: <NotFound /> }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

function Layout() {
  return (
    <>
      <nav className="navbar">
        {/* end: only "active" on exactly "/", not on every page that starts with "/" */}
        <NavLink className="nav-link" to="/" end>Home</NavLink>
        <NavLink className="nav-link" to="/cars">Cars</NavLink>
      </nav>
      <Outlet />
    </>
  )
}

function Home() {
  return (
    <div className="page page-home">
      <h1>Homepage</h1>
      <p className="subtitle">A small playground for React Router concepts</p>
      <Link className="btn" to="/cars">Cars</Link>
    </div>
  )
}

function Cars() {
  return (
    <div className="page">
      <h1>Cars</h1>
      <ul className="brand-nav">
        {brands.map(brand => (
          <li key={brand}>
            <NavLink className="brand-link" to={`/cars/${brand.toLowerCase()}`}>{brand}</NavLink>
          </li>
        ))}
      </ul>
      {/* The nested route (index or :slug) renders here */}
      <Outlet />
    </div>
  )
}

function CarsByBrand() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const model = searchParams.get('model');
  const carsOfBrand = cars.filter(car =>
    car.brand.toLowerCase() === slug?.toLowerCase() &&
    (!model || car.model.toLowerCase().includes(model.toLowerCase()))
  );

  return (
    <div className="brand-section">
      <h2>{ slug?.toUpperCase() } Cars</h2>
      {carsOfBrand.length === 0 ? (
        <p className="empty">No models found.</p>
      ) : (
        <ul className="car-list">
          {carsOfBrand.map(car => (
            <li key={car.model} className="car-item">
              <span className="car-model">{ car.model }</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function NotFound() {
  return (
    <div className="page page-home">
      <h1>404</h1>
      <p className="subtitle">This page does not exist.</p>
      <Link className="btn" to="/">Back home</Link>
    </div>
  )
}

export default App
