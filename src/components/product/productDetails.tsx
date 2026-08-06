import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import type { Product } from "../../types/Products";
import { fetchProduct } from "../../services/GetProductById";
import { toast } from "sonner";
import { Cart } from "../../utils/Cart";
import { ChevronLeft, ChevronRight, Package, Truck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "../ui/ProductCard";
import { getProductsByCategory } from "../../services/GetProductByCategory";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id]);

  useEffect(() => {
    if (!product) {
      return;
    }

    const getProducts = async () => {
      try {
      const data = await getProductsByCategory(product.category, 5, 0);
      setRelatedProducts(data.products);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    getProducts();
  }, [product])

  const handleAddItem = useCallback(() => {
    if (!product) return;
    Cart(product);
    toast.success("added to cart")
  }, [product]);

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  }

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  }
  // ✅ Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700 animate-pulse">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
        Product not found.
      </div>
    );
  }

  

  return (
  <main className="min-h-screen bg-gray-100">
    <section className="mx-auto container max-w-7xl p-8 rounded-2xl flex flex-col md:flex-row gap-12">
      {/* Left */}
      <article className="flex flex-col place-content-center">
        <div className="bg-gray-100 rounded-xl">
          <img
            src={product.images[currentIndex]}
            alt={product.title}
            width={850} height={650}
          />
        </div>

        <div
          className={`${
            product.images.length === 1 ? "hidden" : "block"
          } flex flex-row place-content-center gap-4 mt-6`}
        >
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-40 cursor-pointer transition"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === product.images.length - 1}
            className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-40 cursor-pointer transition"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </article>

      {/* Right */}
      <article className="flex flex-col place-content-center space-y-5">
        <h1 className="text-2xl font-semibold text-gray-700">
          {product.title}
        </h1>

        <p className="text-xl font-normal text-gray-700">
          ${product.price}
        </p>

        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              product.availabilityStatus === "In Stock"
                ? "bg-green-100 text-green-700"
                : product.availabilityStatus === "Low Stock"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.availabilityStatus}
          </span>

          <span className="text-gray-500">
            Stock: {product.stock}
          </span>
        </div>

        <p className="text-gray-600 leading-7">
          {product.description}
        </p>

        <div className="grid grid-cols-[1fr_1fr] gap-4 text-lg">
          <div>
            <p className="text-gray-500">Brand</p>
            <p className="font-semibold text-gray-600">{product.brand}</p>
          </div>

          <div>
            <p className="text-gray-500">Category</p>
            <p className="font-semibold text-gray-600">{product.category}</p>
          </div>

          <div>
            <p className="text-gray-500">Rating</p>
            <p className="font-semibold text-gray-600">⭐ {product.rating}</p>
          </div>

          <div>
            <p className="text-gray-500">SKU</p>
            <p className="font-semibold text-gray-600">{product.sku}</p>
          </div>
        </div>

        <button
          className="mt-4 w-fit rounded-lg bg-green-500 px-8 py-3 text-white font-semibold hover:bg-green-600 active:bg-green-700 transition cursor-pointer"
          onClick={handleAddItem}
        >
          Add To Cart
        </button>
            
        <div>
        <h2 className="w-fit rounded-sm text-xl text-gray-700 font-semibold flex flex-row gap-2">Product Details <Package size={25} className="my-auto"/></h2>
        <ul className="mt-2 text-gray-600">
          <li className="font-semibold">Weight: {product.weight}</li>
          <li className="font-semibold">Dimentions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth}</li>
        </ul>
      </div>
          <div>
            <h2 className="w-fit rounded-sm text-xl text-gray-700 font-semibold flex flex-row gap-2">Delivery & Warranty Details <Truck size={25} className="my-auto"/></h2>
        <ul className="mt-2 text-gray-600">
          <li className="font-semibold">Warranty Information: {product.warrantyInformation}</li>
          <li className="font-semibold">Shipping Information: {product.shippingInformation}</li>
          <li className="font-semibold">Return Policy: {product.returnPolicy}</li>
        </ul>
          </div>

      </article>

      
    </section>
    <section className="mx-auto container p-8">
      <article>
        <h2 className="text-xl text-gray-700 font-semibold">Reviews</h2>
        <Swiper
  modules={[Navigation, Pagination]}
  slidesPerView={1}
  speed={300}
  pagination={{ clickable: true }} className="rounded-xl mt-2"
>
  {product.reviews.map((review, index) => (
    <SwiperSlide key={index}>
      <div className="w-full bg-gray-200 p-8">
        <h3>{review.reviewerName}</h3>
        <h4>{review.reviewerEmail}</h4>

        <div className="flex justify-between mt-2">
          <span>⭐ {review.rating}</span>
          <span>{new Date(review.date).toDateString()}</span>
        </div>

        <p className="mt-5">{review.comment}</p>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

      </article>
      <article className="mt-5">
        <h2 className="text-xl text-gray-700 font-semibold">Related Products</h2>
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          {relatedProducts.filter((item) => item.id !== product.id).map((item) => (
    <ProductCard key={item.id} product={item} />
  ))}
        </div>
      </article>
    </section>
  </main>
);
}