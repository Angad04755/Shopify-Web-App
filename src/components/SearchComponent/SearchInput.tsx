import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchIcon, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchProduct } from "../../api";
import type { Product } from "../../types/Products";
import SearchSuggestions from "./SearchSuggestions";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const urlQuery = searchParams.get("query") ?? "";

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(query.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  const { data, isFetching, isError } = useQuery({
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
            <SearchSuggestions
              suggestions={suggestions}
              isFetching={isFetching}
              isError={isError}
              onSelect={handleSubmit}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchInput;