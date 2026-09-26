import { useForm } from "@tanstack/react-form";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const form = useForm({
    defaultValues: { query: "" },
    onSubmit: ({ value }) => {
      onSearch(value.query);
    },
  });

  return (
    <form className="search-bar" role="search" onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
      <form.Field name="query">
        {(field) => (
          <input
            className="search-input"
            type="search"
            aria-label="Search brand or model"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder="Search brand or model"
          />
        )}
      </form.Field>
      <button className="search-btn" type="submit">Search</button>
    </form>
  );
}
