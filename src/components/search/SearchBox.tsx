// SearchBox.tsx

"use client";

import {
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import { useState, useEffect } from "react";

import { type Product } from "../product/types";

import { SearchIcon } from "lucide-react";

import { searchProduct } from "../../services/GetSearchProduct";

interface SearchBoxProps {
  Onsearch: (query: string) => void
}

const SearchBox = ({Onsearch}: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();

  // Suggestions
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await searchProduct(query);

        setSuggestions(res.products.slice(0, 6));
      } catch (error) {
        console.error(error);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Clear on route change
  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/cart"
    ) {
      setQuery("");
      setSuggestions([]);
    }
  }, [location.pathname]);

  // Sync URL query
  useEffect(() => {
    const urlQuery = searchParams.get("query");

    if (!urlQuery) return;

    setQuery(urlQuery);

    setSuggestions([]);
  }, [searchParams]);

  const goToSearch = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) return;

    setSuggestions([]);

    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
    Onsearch(trimmed);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    goToSearch(query);
  };

  return (
    <div className="mt-10 flex justify-center">
      <div className="w-full px-5 md:px-35">
        <form
          onSubmit={handleSubmit}
          className="flex items-center rounded-full border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition duration-150 ease-in-out"
        >
          <SearchIcon
            size={22}
            color="gray"
            className="ml-3"
          />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 outline-none rounded-full"
          />
        </form>

        {query.trim() && suggestions.length > 0 && (
          <div className="top-12 z-50 rounded-xl bg-white shadow border overflow-hidden">
            {suggestions.map((i) => (
              <div
                key={i.id}
                onClick={() =>
                  navigate(`/product/product-details/${i.id}`)
                }
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
              >
                {i.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;