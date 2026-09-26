import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { CarsPage } from "./pages/CarsPage";
import { BrandPage } from "./pages/BrandPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/cars",
        element: <CarsPage />,
        children: [
          { index: true, element: <p className="empty">Pick a brand above.</p> },
          { path: ":slug", element: <BrandPage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
