
"use client";

import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import cart from "../../assets/images/cart.svg";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  IncreaseQuanity,
  DecreaseQuantity,
  ClearCart,
  DelteFromCart,
} from "../../redux/slices/cartSlice";

const CartPage = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const addQuantity = (productId: number) => {
    dispatch(IncreaseQuanity(productId));
  };

  const removeQuantity = (productId: number) => {
    dispatch(DecreaseQuantity(productId));
  };

  const removeItemCompletely = (productId: number) => {
    dispatch(DelteFromCart(productId));
  };

  const clearCart = () => {
    dispatch(ClearCart());
    localStorage.removeItem("cart");
  };

  const subtotal = useMemo(
    () =>
      Number(
        items
          .reduce(
            (total, item) =>
              total + item.product.price * item.quantity,
            0
          )
          .toFixed(2)
      ),
    [items]
  );

  const vat = useMemo(
    () => Number((subtotal * 0.15).toFixed(2)),
    [subtotal]
  );

  const totalPriceVat = useMemo(
    () => Number((subtotal + vat).toFixed(2)),
    [subtotal, vat]
  );

  if (items.length === 0) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-[75vh] bg-gray-50  py-12"
      >
        <div className="flex flex-col items-center text-center">
          <img
            src={cart}
            alt="Empty shopping cart"
            width={240}
            height={240}
            className="max-w-full object-contain"
          />

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">
            Your cart is empty
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Looks like you haven't added anything yet.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 cursor-pointer rounded-full bg-gray-800 px-7 py-3 font-medium text-white transition hover:bg-gray-700"
          >
            Continue Shopping
          </button>
        </div>
      </motion.main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8 sm:px-6 lg:py-12"
    >
      <div className="mx-auto container p-5">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Shopping Cart
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Review your items before checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px]">
          {/* Cart Items */}
          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Your Items ({items.length})
              </h2>

              <button
                onClick={clearCart}
                className="shrink-0 cursor-pointer text-sm font-medium text-red-500 transition hover:text-red-700"
              >
                Clear cart
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <motion.article
                  key={item.product.id}
                  layout
                  className="flex min-w-0 flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:p-5"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    width={112}
                    height={112}
                    className="h-28 w-28 shrink-0 self-center rounded-xl bg-gray-50 object-contain p-2 sm:self-auto"
                  />

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                    <div>
                      <h3 className="line-clamp-2 text-sm font-semibold leading-6 text-gray-800 sm:text-base">
                        {item.product.title}
                      </h3>

                      <p className="mt-2 text-lg font-bold text-gray-900">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                        <button
                          onClick={() =>
                            removeQuantity(item.product.id)
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="cursor-pointer px-3 py-2 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>

                        <span className="min-w-10 px-2 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            addQuantity(item.product.id)
                          }
                          aria-label="Increase quantity"
                          className="cursor-pointer px-3 py-2 text-gray-700 transition hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          removeItemCompletely(item.product.id)
                        }
                        aria-label={`Remove ${item.product.title} from cart`}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-xs text-gray-500">
                      Item total
                    </p>
                    <p className="mt-1 font-semibold text-gray-800">
                      $
                      {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-6 cursor-pointer text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              ← Continue shopping
            </button>
          </section>

          {/* Order Summary */}
          <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4 text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 text-gray-600">
                <span>VAT (15%)</span>
                <span className="font-medium text-gray-900">
                  ${vat.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    ${totalPriceVat.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                // Add your checkout navigation or payment logic here.
              }}
              className="mt-7 w-full cursor-pointer rounded-xl bg-yellow-300 px-5 py-3.5 font-semibold text-gray-900 transition hover:bg-yellow-400 active:bg-yellow-500"
            >
              Proceed to Checkout
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-gray-500">
              Taxes are calculated based on your current subtotal.
            </p>
          </aside>
        </div>
      </div>
    </motion.main>
  );
};

export default CartPage;
