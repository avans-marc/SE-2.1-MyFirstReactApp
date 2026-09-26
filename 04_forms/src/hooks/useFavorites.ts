import { useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  function toggleFavorite(id: string) {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return { favorites, toggleFavorite };
}
