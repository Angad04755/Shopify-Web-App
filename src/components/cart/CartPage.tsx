"use client";

import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import cart from "../../assets/images/cart.svg";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { IncreaseQuanity, DecreaseQuantity, ClearCart, DelteFromCart } from "../../redux/slices/cartSlice";
const CartPage = () => {
  const items = useSelector((item: RootState) => item.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);  

  const addQuantity = (productId: number) => {
  dispatch(IncreaseQuanity(productId));
  localStorage.setItem("cart", JSON.stringify(items));
};

  const removeQuantity = (productId: number) => {
  dispatch(DecreaseQuantity(productId));

  localStorage.setItem("cart", JSON.stringify(items));
};

  const removeItemCompletely = (productId: number) => {
    dispatch(DelteFromCart(productId))

    localStorage.setItem("cart", JSON.stringify(items))
  };

  const clearCart = () => {
    dispatch(ClearCart());
    localStorage.removeItem("cart");
  };

  const totalQuantity = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 py-10"
      >
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <img src={cart} alt="empty cart" width={280} height={280} />

          <h2 className="mt-6 text-xl font-semibold">
            Your cart is empty
          </h2>

          <div className="mt-6">
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer rounded-full bg-gray-700 px-6 py-3 text-white hover:bg-gray-800 active:bg-gray-900"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-10"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <span
            className="float-right cursor-pointer text-gray-700 hover:text-gray-800 active:text-gray-900"
            onClick={clearCart}
          >
            Clear cart
          </span>

          <h1 className="text-xl font-semibold text-gray-700">
            Shopping Cart ({totalQuantity})
          </h1>

          {items.map((item) => (
            <motion.div
              key={item.product.id}
              className="flex gap-4 rounded-2xl border bg-white p-4 shadow-sm"
            >
              <img
                src={item.product.thumbnail}
                alt={item.product.title}
                width={100}
                height={100}
                className="rounded-xl object-cover"
              />

              <div className="flex-1">
                <h3 className="text-sm font-medium">
                  {item.product.title}
                </h3>

                <div className="mt-4 flex justify-between">
                  <span>${item.product.price}</span>
                  <span>Qty {item.quantity}</span>
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={() => addQuantity(item.product.id)}
                    className="rounded-md border px-3 py-1"
                  >
                    + Add
                  </button>

                  <button
                    onClick={() => removeQuantity(item.product.id)}
                    className="rounded-md border px-3 py-1"
                  >
                    Remove
                  </button>

                  <Trash2
                    className="cursor-pointer"
                    onClick={() =>
                      removeItemCompletely(item.product.id)
                    }
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col h-fit rounded-3xl bg-white p-6 text-gray-700 shadow-lg">
          <h2 className="mb-6 text-lg font-semibold">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>VAT (15%)</span>
              <span>${vat}</span>
            </div>

            <div className="flex justify-between border-t pt-4 font-semibold">
              <span>Total</span>
              <span>${totalPriceVat}</span>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <button className="w-full cursor-pointer rounded-lg bg-yellow-300 px-5 py-3 font-medium transition hover:bg-yellow-400 active:bg-yellow-500">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;