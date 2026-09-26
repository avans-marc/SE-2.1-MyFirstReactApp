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

export function BrandNavSkeleton({ count = 5 }: { count?: number }) {
  return (
    <ul className="brand-nav" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <span className="brand-link skeleton-pill" />
        </li>
      ))}
    </ul>
  );
}
