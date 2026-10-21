
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchIcon, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchProduct } from "../../api";
import type { Product } from "../../types/Products";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const urlQuery = searchParams.get("query") ?? "";

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(query.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Keep the input synchronized with the URL
  useEffect(() => {
    setQuery(urlQuery);
    
  }, [urlQuery]);

  // Fetch suggestions using TanStack Query
  const {
    data,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["product-search-suggestions", debouncedSearch],
    queryFn: () => searchProduct(debouncedSearch),
    enabled:
      debouncedSearch.length > 0 &&
      debouncedSearch !== urlQuery,
  });

  const suggestions: Product[] = data?.products?.slice(0, 3) ?? [];

  const showSuggestions =
    query.trim().length > 0 &&
    query.trim() !== urlQuery &&
    query.trim() === debouncedSearch;

  const handleSubmit = (searchTerm: string) => {
    const trimmedQuery = searchTerm.trim();

    if (!trimmedQuery) return;

    navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  };

  const clearSearch = () => {
    setQuery("");
    setDebouncedSearch("");
  };

  return (
    <div className="sticky top-17.5 z-50 w-full bg-white py-5 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(query);
          }}
          className="flex items-center rounded-full border-2 border-blue-500 bg-white shadow-md"
        >
          <SearchIcon
            size={22}
            className="ml-4 shrink-0 text-gray-500"
          />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            autoComplete="off"
            className="min-w-0 flex-1 rounded-full px-4 py-3 outline-none"
          />

          {query && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="mr-4 shrink-0 cursor-pointer text-gray-500 hover:text-gray-900"
            >
              <X size={20} />
            </button>
          )}
        </form>

        {showSuggestions && (
          <div className="relative">
            <div className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-xl">
              {isFetching && (
                <p className="px-5 py-3 text-sm text-gray-500">
                  Searching products...
                </p>
              )}

              {!isFetching && isError && (
                <p className="px-5 py-3 text-sm text-red-500">
                  Unable to load suggestions. Please try again.
                </p>
              )}

              {!isFetching && !isError && suggestions.length === 0 && (
                <p className="px-5 py-3 text-sm text-gray-500">
                  No matching products found.
                </p>
              )}

              {!isFetching &&
                !isError &&
                suggestions.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => handleSubmit(item.title)}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
