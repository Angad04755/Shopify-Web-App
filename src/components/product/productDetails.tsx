import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Package,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  ShoppingCart,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { toast } from "sonner";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { Product } from "../../types/Products";
import { getProductById } from "../../api/index";
import { AddToCart } from "../../redux/slices/cartSlice";
import {
  AddtoWishlist,
  DeleteFromWishlist,
} from "../../redux/slices/WishlistSlice";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(0);

  const [isInWishlist, setIsInWishlist] = useState(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    return wishlist.some((item: Product) => item.id === Number(id));
  });

  const { data, isLoading, isError } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Product ID is missing");
      }

      return getProductById(id);
    },
    enabled: Boolean(id),
  });

  const handleWishlist = () => {
    if (!data) return;

    const wishlist: Product[] = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    if (isInWishlist) {
      const updatedWishlist = wishlist.filter(
        (item) => item.id !== data.id
      );

      dispatch(DeleteFromWishlist(data.id));
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
      toast.success("Removed from wishlist");
    } else {
      const updatedWishlist = [
        ...wishlist.filter((item) => item.id !== data.id),
        data,
      ];

      dispatch(AddtoWishlist(data));
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(true);
      toast.success("Added to wishlist");
    }
  };

  const handleAddToCart = () => {
    if (!data) return;

    dispatch(AddToCart(data));
    toast.success("Added to cart");
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid animate-pulse grid-cols-1 gap-10 md:grid-cols-2">
          <div className="h-[450px] rounded-2xl bg-gray-200" />

          <div className="space-y-5">
            <div className="h-8 w-3/4 rounded bg-gray-200" />
            <div className="h-5 w-1/2 rounded bg-gray-200" />
            <div className="h-24 rounded bg-gray-200" />
            <div className="h-12 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Unable to load product
        </h2>

        <p className="mt-2 text-gray-500">
          Please try again later.
        </p>
      </div>
    );
  }

  const discountedPrice =
    data.price - (data.price * data.discountPercentage) / 100;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Product images and information */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left: Product images */}
        <div className="min-w-0">
          <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: ".product-prev",
                nextEl: ".product-next",
              }}
              pagination={{ clickable: true }}
              onSlideChange={(swiper) =>
                setSelectedImage(swiper.activeIndex)
              }
              className="product-gallery"
            >
              {data.images.map((image, index) => (
                <SwiperSlide key={`${image}-${index}`}>
                  <div className="flex h-[350px] items-center justify-center p-8 sm:h-[480px]">
                    <img
                      src={image}
                      alt={data.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              className="product-prev absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              className="product-next absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Image thumbnails */}
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {data.images.map((image, index) => (
              <button
                type="button"
                key={`${image}-thumbnail-${index}`}
                onClick={() => setSelectedImage(index)}
                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border bg-white p-2 transition ${
                  selectedImage === index
                    ? "border-gray-900 ring-1 ring-gray-900"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                aria-label={`View product image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${data.title} thumbnail ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product information */}
        <div className="flex min-w-0 flex-col">
          <div className="mb-3">
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
              {data.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {data.title}
          </h1>

          {/* Rating and availability */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={18} fill="currentColor" />

              <span className="font-semibold text-gray-900">
                {data.rating}
              </span>
            </div>

            <span className="text-sm text-gray-400">|</span>

            <span className="text-sm text-gray-500">
              {data.reviews?.length ?? 0} customer reviews
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                data.stock > 0
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {data.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Price */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ${discountedPrice.toFixed(2)}
            </span>

            {data.discountPercentage > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ${data.price.toFixed(2)}
                </span>

                <span className="rounded-md bg-red-50 px-2 py-1 text-sm font-semibold text-red-600">
                  {Math.round(data.discountPercentage)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-5 leading-7 text-gray-600">
            {data.description}
          </p>

          {/* Basic product information */}
          <div className="mt-6 space-y-3 border-y border-gray-100 py-5 text-sm">
            <div className="flex gap-2">
              <span className="w-20 shrink-0 text-gray-500">
                Brand
              </span>

              <span className="font-medium text-gray-900">
                {data.brand || "N/A"}
              </span>
            </div>

            <div className="flex gap-2">
              <span className="w-20 shrink-0 text-gray-500">
                Category
              </span>

              <span className="font-medium capitalize text-gray-900">
                {data.category}
              </span>
            </div>

            <div className="flex gap-2">
              <span className="w-20 shrink-0 text-gray-500">
                SKU
              </span>

              <span className="font-medium text-gray-900">
                {data.sku}
              </span>
            </div>

            <div className="flex gap-2">
              <span className="w-20 shrink-0 text-gray-500">
                Availability
              </span>

              <span className="font-medium text-gray-900">
                {data.availabilityStatus}
              </span>
            </div>
          </div>

          {/* Cart and wishlist actions */}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={data.stock <= 0}
              className="flex flex-1 items-center place-content-center gap-2 rounded-xl bg-yellow-300 px-5 py-3.5 font-semibold text-slate-700 transition hover:bg-yellow-400 active:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <button
              type="button"
              onClick={handleWishlist}
              aria-label={
                isInWishlist
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              aria-pressed={isInWishlist}
              className={`group flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-full border transition-all duration-200 active:scale-90 cursor-pointer ${
                isInWishlist
                  ? "border-red-200 bg-red-50 text-red-500"
                  : "border-gray-200 bg-white text-gray-600"
              }`}
            >
              <Heart
                size={22}
                strokeWidth={1.8}
                className={`transition-all duration-200 ${
                  isInWishlist
                    ? "scale-110 fill-red-500 text-red-500"
                    : "fill-transparent"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Full-width specifications and shipping section */}
      <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:items-stretch">
        {/* Product specifications */}
        <div className="flex min-w-0 flex-1 flex-col rounded-2xl border border-gray-200 p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Package size={19} className="text-gray-700" />

            <h2 className="font-semibold text-gray-900">
              Specifications
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-xs text-gray-500">
                Dimensions
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {data.dimensions
                  ? `${data.dimensions.width} × ${data.dimensions.height} × ${data.dimensions.depth} cm`
                  : "N/A"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-xs text-gray-500">
                Weight
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {data.weight} kg
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-xs text-gray-500">
                Minimum order
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {data.minimumOrderQuantity} unit(s)
              </p>
            </div>
          </div>
        </div>

        {/* Shipping information */}
        <div className="flex min-w-0 flex-1 flex-col rounded-2xl border border-gray-200 p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Truck size={19} className="text-gray-700" />

            <h2 className="font-semibold text-gray-900">
              Shipping & Returns
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <Truck
                size={18}
                className="mt-0.5 shrink-0 text-gray-500"
              />

              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  Shipping
                </p>

                <p className="mt-1 text-sm leading-5 text-gray-500">
                  {data.shippingInformation ||
                    "Shipping details unavailable"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-gray-500"
              />

              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  Warranty
                </p>

                <p className="mt-1 text-sm leading-5 text-gray-500">
                  {data.warrantyInformation ||
                    "Warranty details unavailable"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RotateCcw
                size={18}
                className="mt-0.5 shrink-0 text-gray-500"
              />

              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  Returns
                </p>

                <p className="mt-1 text-sm leading-5 text-gray-500">
                  {data.returnPolicy ||
                    "Return details unavailable"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer reviews */}
      {data.reviews && data.reviews.length > 0 && (
        <section className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Customer Reviews
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.reviews.map((review, index) => (
              <div
                key={`${review.reviewerEmail}-${index}`}
                className="rounded-2xl border border-gray-200 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-gray-900">
                    {review.reviewerName}
                  </p>

                  <div className="flex shrink-0 items-center gap-1 text-amber-500">
                    <Star size={15} fill="currentColor" />

                    <span className="text-sm font-medium text-gray-900">
                      {review.rating}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {review.comment}
                </p>

                <p className="mt-3 text-xs text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related products */}
      <section className="mt-16 border-t border-gray-200 pt-10">
        <RelatedProducts product={data} />
      </section>
    </main>
  );
};

export default ProductDetails;