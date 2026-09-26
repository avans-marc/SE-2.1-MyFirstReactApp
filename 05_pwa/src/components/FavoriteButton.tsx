type FavoriteButtonProps = {
  label: string;
  isFavorite: boolean;
  onToggle: () => void;
};

// A presentational component: no state of its own.
// Data comes in via props (isFavorite), the click goes out via a callback (onToggle).
export function FavoriteButton({ label, isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <button
      className={`favorite-btn${isFavorite ? " is-active" : ""}`}
      onClick={onToggle}
      aria-label={isFavorite ? `Remove ${label} from favorites` : `Add ${label} to favorites`}
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
}
