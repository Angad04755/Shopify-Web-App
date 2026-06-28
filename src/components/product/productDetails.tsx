import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { type Product } from "../../types/Products";
import Button from "../ui/Button";
import { fetchProduct } from "../../services/GetProductById";
import { toast } from "sonner";
import { Cart } from "../../utils/Cart";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // ✅ API call using useEffect
  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProduct(id);
        setProduct(data.product);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id]);


  const handleAddItem = useCallback(() => {
    if (!product) return;
    Cart(product);
    toast.success("added to cart")
  }, [product]);

  // ✅ Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
        Loading product...
      </div>
    );
  }

  // ✅ Error
  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
        Product not found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden
                   flex flex-col md:grid md:grid-cols-2"
      >
        {/* Image */}
        <div className="bg-gray-100 flex items-center justify-center p-6 sm:p-10">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="object-contain rounded-lg w-full max-w-[320px]"
          />
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between gap-5">
          <div>
            <p className="text-sm uppercase text-gray-700">
              {product.category}
            </p>

            <h1 className="text-gray-700 text-2xl font-semibold mt-2">
              {product.title}
            </h1>

            <p className="text-gray-700 mt-4">
              {product.description}
            </p>

            <div className="flex items-center mt-4">
              <span className="text-yellow-300">★</span>
              <span className="ml-2 text-sm text-gray-700">
                {product.rating
                  ? `${product.rating} / 5 rating`
                  : "No ratings yet"}
              </span>
            </div>

            <p className="text-3xl font-semibold mt-6">
              ${product.price}
            </p>
          </div>

          <Button
            text="Add to Cart"
            onClick={handleAddItem}
            classname="px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 cursor-pointer transition"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}