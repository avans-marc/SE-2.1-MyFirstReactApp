import { Outlet } from "react-router-dom";
import { BrandNav } from "../components/BrandNav";
import { brands } from "../data/cars";

export function CarsPage() {
  return (
    <div className="page">
      <h1>Cars</h1>
      <BrandNav brands={brands} />
      {/* The nested route (index or :slug) renders here */}
      <Outlet />
    </div>
  );
}
