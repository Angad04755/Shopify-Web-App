"use client";
import SelectableButton from "../ui/SelectableButton";
import { useState, useEffect } from "react";
import { getProductsByCategory } from "../../services/GetProductByCategory";
import ProductCard from "../ui/ProductCard";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { type Product } from "../product/types";
import { GridLoader } from "react-spinners";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";



const DesktopProducts = () => {
  const [page, setPage] = useState(0);
  const productsPerPage = 4;
  const options = [
    {label: "Low - High", value: "price_asc"},
    {label: "High - Low", value: "price_desc"},
    {label: "Default", value: ""},
  ] 
  
  const [sortBy, setSortBy] = useState("")

  const [loading, setLoading] =
    useState(false);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [error, setError] =
    useState(false);

  const [total, setTotal] =
    useState(0);

  const { slug } = useParams();

  const skip =
    page * productsPerPage;

  useEffect(() => {
    if (!slug) return;
    const fetchProducts =
      async () => {
        try {
          setLoading(true);

          setError(false);

          const res =
            await getProductsByCategory(
              slug,
              productsPerPage,
              skip
            );

          setProducts(res.products);

          setTotal(res.total);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      };

    fetchProducts();
  }, [slug, skip]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [products]);

  const displayedProducts = sortBy === "Default" ? products : [...products].sort((a, b) => sortBy === "price_asc" ? a.price - b.price : b.price - a.price);

  const TOTAL_PAGES = Math.ceil(
    total / productsPerPage
  );

  const isLastPage =
    page === TOTAL_PAGES - 1;

  const pages: (number | null)[] =
    [];

  for (
    let i = 0;
    i < TOTAL_PAGES;
    i++
  ) {
    if (
      i === 0 ||
      i === TOTAL_PAGES - 1 ||
      (i >= page - 1 &&
        i <= page + 1)
    ) {
      pages.push(i);
    } else {
      pages.push(null);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center mt-10">
        <GridLoader
          size={25}
          color="black"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center mt-10">
        <span>
          Cannot load Products
        </span>
      </div>
    );
  }

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-6 py-8">
      <div className="float-right">
        <SelectableButton option={options} selected={sortBy} onSelect={setSortBy}/>
      </div>
      <h1 className="text-2xl font-semibold mb-6 capitalize">
        {slug || "Products"}
      </h1>
      
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr] gap-6"
      >
        {displayedProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <ProductCard
              product={product}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="w-full flex justify-center gap-1 mt-8 items-center">
        <button
          disabled={page === 0}
          onClick={() =>
            setPage((p) => p - 1)
          }
          className="px-1 py-1 border rounded-md disabled:opacity-40"
        >
          <ChevronLeft size={25} />
        </button>

        <div className="flex gap-2">
          {pages.map((p, index) => {
            if (p === null) {
              return (
                <span
                  key={index}
                  className="px-2 text-gray-500 mt-[10px]"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={index}
                onClick={() =>
                  setPage(p)
                }
                className={`px-3 py-1 border rounded-md cursor-pointer ${
                  page === p
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {p + 1}
              </button>
            );
          })}
        </div>

        <button
          disabled={
            isLastPage ||
            TOTAL_PAGES === 0
          }
          onClick={() =>
            setPage((p) => p + 1)
          }
          className="px-1 py-1 border rounded-md disabled:opacity-40"
        >
          <ChevronRight size={25} />
        </button>
      </div>

      {isLastPage &&
        TOTAL_PAGES > 0 && (
          <p className="text-center text-gray-400 text-sm mt-6">
            You've reached the end
          </p>
        )}
    </section>
  );
};

export default DesktopProducts;