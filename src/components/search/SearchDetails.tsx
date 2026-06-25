"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import ProductCard from "../ui/ProductCard";
import SearchBox from "./SearchBox";
import { searchProduct } from "../../services/GetSearchProduct";
import { type Product } from "../product/types";

const SearchDetails = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("query");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await searchProduct(searchQuery);

        setProducts(data.products);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  const topResult = products[0];
  const otherResults = products.slice(1);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-white"
    >
      <SearchBox />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchQuery && (
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              "{searchQuery}"
            </h1>

            {!loading && (
              <p className="mt-2 text-sm text-gray-500">
                {products.length} result{products.length !== 1 ? "s" : ""} found
              </p>
            )}
          </header>
        )}

        {loading && (
          <div className="flex justify-center py-20">
            <motion.p
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
              }}
              className="text-gray-500"
            >
              Searching products...
            </motion.p>
          </div>
        )}

        {!loading && searchQuery && products.length === 0 && (
          <div className="flex justify-center py-20">
            <p className="text-gray-500">
              No products found.
            </p>
          </div>
        )}

        {!loading && topResult && (
          <>
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Top Result
              </h2>

              <div className="max-w-xs">
                <ProductCard product={topResult} />
              </div>
            </section>

            {otherResults.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Related Results
                </h2>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      opacity: 0,
                    },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                  className="
                    grid
                    grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-4
                    gap-6
                  "
                >
                  {otherResults.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 10,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                        },
                      }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </section>
            )}
          </>
        )}
      </section>
    </motion.main>
  );
};

export default SearchDetails;