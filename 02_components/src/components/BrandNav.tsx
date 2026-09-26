import { NavLink } from "react-router-dom";

type BrandNavProps = {
  brands: string[];
};

export function BrandNav({ brands }: BrandNavProps) {
  return (
    <ul className="brand-nav">
      {brands.map((brand) => (
        <li key={brand}>
          <NavLink className="brand-link" to={`/cars/${brand.toLowerCase()}`}>{brand}</NavLink>
        </li>
      ))}
    </ul>
  );
}
