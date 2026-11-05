import type { Product } from "../../types/Products";

interface SearchSuggestionsProps {
  suggestions: Product[];
  isFetching: boolean;
  isError: boolean;
  onSelect: (title: string) => void;
}

const SearchSuggestions = ({
  suggestions,
  isFetching,
  isError,
  onSelect,
}: SearchSuggestionsProps) => {

  // Loading state
  if (isFetching) {
    return (
      <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-100 bg-white shadow-xl">
        <p className="px-5 py-3 text-sm text-gray-500">
          Searching products...
        </p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="absolute z-50 mt-2 w-full rounded-xl border border-red-100 bg-white shadow-xl">
        <p className="px-5 py-3 text-sm text-red-500">
          Unable to load suggestions. Please try again.
        </p>
      </div>
    );
  }

  // Empty state
  if (suggestions.length === 0) {
    return (
      <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-100 bg-white shadow-xl">
        <p className="px-5 py-3 text-sm text-gray-500">
          No matching products found.
        </p>
      </div>
    );
  }

  // Normal suggestions
  return (
    <div className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-xl">
      {suggestions.map((item) => (
        <button
          type="button"
          key={item.id}
          onClick={() => onSelect(item.title)}
          className="flex w-full cursor-pointer items-center gap-4 px-5 py-3 text-left text-sm transition hover:bg-gray-100"
        >
          <img
            src={item.thumbnail}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-md bg-gray-50 object-contain"
          />

          <span className="line-clamp-2">
            {item.title}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SearchSuggestions;