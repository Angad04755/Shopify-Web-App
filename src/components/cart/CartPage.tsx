"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import cart from "../../assets/images/cart.svg";
import type { CartItem } from "../../types/CartItem";

const CartPage = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const storedItems: CartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setItems(storedItems);
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addQuantity = (productId: number) => {
    const updatedCart = [...items];
    const item = updatedCart.find((item) => item.product.id === productId);
    if (item) {
      item.quantity += 1;
    }
    updateCart(updatedCart);
  };

  const removeQuantity = (productId: number) => {
    const updatedCart = [...items];
    const item = updatedCart.find((item) => item.product.id === productId);
    if (!item) return;

    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCart(updatedCart);
    } else {
      const filteredCart = updatedCart.filter(
        (item) => item.product.id !== productId
      );
      updateCart(filteredCart);
    }
  };

  const removeItemCompletely = (productId: number) => {
    const updatedCart = items.filter((item) => item.product.id !== productId);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    setItems([]);
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
          .reduce((total, item) => total + item.product.price * item.quantity, 0)
          .toFixed(2)
      ),
    [items]
  );

  const vat = useMemo(() => Number((subtotal * 0.15).toFixed(2)), [subtotal]);

  const totalPriceVat = useMemo(
    () => Number((subtotal + vat).toFixed(2)),
    [subtotal, vat]
  );

  // ✅ FIX: Empty cart state is now a standalone early return (no nested JSX below it)
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 py-10"
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <img src={cart} alt="empty cart" width={280} height={280} />
          <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>
          <div className="mt-6">
            <button
              onClick={() => navigate("/")}
              className="rounded-full bg-black px-6 py-3 text-white cursor-pointer active:bg-gray-800"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ✅ FIX: Main cart UI is now a separate return, reached only when items exist
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-10"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <span className="float-right cursor-pointer active:text-gray-700" onClick={clearCart}>
            Clear cart
          </span>
          <h1 className="text-xl font-semibold">
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
                <h3 className="text-sm font-medium">{item.product.title}</h3>

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
                    onClick={() => removeItemCompletely(item.product.id)}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg flex flex-col h-full">
          <h2 className="mb-6 text-lg font-semibold">Order Summary</h2>

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
            <button className="w-full rounded-lg bg-yellow-300 px-5 py-3 font-medium active:bg-yellow-400 transition cursor-pointer">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;