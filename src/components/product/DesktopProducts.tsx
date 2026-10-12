import SelectableButton from "../ui/SelectableButton";
import { useState, useEffect } from "react";
import { getProductsByCategory } from "../../api";
import ProductCard from "../ui/ProductCard";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import type { Product } from "../../types/Products";
import { GridLoader } from "react-spinners";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const DesktopProducts = () => {
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("");

  const productsPerPage = 4;

  const options = [
    { label: "Low - High", value: "price_asc" },
    { label: "High - Low", value: "price_desc" },
    { label: "Default", value: "" },
  ];

  const { slug } = useParams();

  const skip = page * productsPerPage;

  const {
    data: result,
    isLoading,
    isError,
  } = useQuery<{
    products: Product[];
    total: number;
  }>({
    queryKey: ["products", slug, page],
    queryFn: () =>
      getProductsByCategory(slug!, productsPerPage, skip),
    enabled: Boolean(slug),
  });

  const data = result?.products ?? [];
  const total = result?.total ?? 0;

  useEffect(() => {
    setPage(0);
  }, [slug]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [data]);

  const displayedProducts = [...data].sort((a, b) => {
    if (sortBy === "price_asc") {
      return a.price - b.price;
    }

    if (sortBy === "price_desc") {
      return b.price - a.price;
    }

    return 0;
  });

  const TOTAL_PAGES = Math.ceil(total / productsPerPage);
  const isLastPage = page >= TOTAL_PAGES - 1;

  const pages: (number | null)[] = [];

  for (let i = 0; i < TOTAL_PAGES; i++) {
    if (
      i === 0 ||
      i === TOTAL_PAGES - 1 ||
      (i >= page - 1 && i <= page + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== null) {
      pages.push(null);
    }
  }

  if (isLoading) {
    return (
      <div className="mt-10 flex min-h-screen items-center justify-center">
        <GridLoader size={25} color="black" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 flex items-center justify-center">
        <span>Cannot load products</span>
      </div>
    );
  }

  return (
    <section className="container mx-auto min-h-screen max-w-7xl p-8">
      <div className="float-right">
        <SelectableButton
          option={options}
          selected={sortBy}
          onSelect={setSortBy}
        />
      </div>

      <h1 className="mb-6 text-2xl font-semibold capitalize text-gray-700">
        {slug || "Products"}
      </h1>

      {displayedProducts.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          No products found.
        </p>
      ) : (
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {displayedProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {TOTAL_PAGES > 0 && (
        <>
          <div className="mt-8 flex w-full items-center justify-center gap-1">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-md border px-1 py-1 disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={25} />
            </button>

            <div className="flex gap-2">
              {pages.map((p, index) => {
                if (p === null) {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="mt-[10px] px-2 text-gray-500"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    aria-current={page === p ? "page" : undefined}
                    className={`cursor-pointer rounded-md border px-3 py-1 ${
                      page === p ? "bg-black text-white" : ""
                    }`}
                  >
                    {p + 1}
                  </button>
                );
              })}
            </div>

            <button
              disabled={isLastPage}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md border px-1 py-1 disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={25} />
            </button>
          </div>

          {isLastPage && (
            <p className="mt-6 text-center text-sm text-gray-400">
              You've reached the end
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default DesktopProducts;