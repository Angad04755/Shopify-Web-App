import { type Product } from "../types/Products";
import { type CartItem } from "../types/CartItem";

export const Cart = (product: Product) => {
  const storedCart: CartItem[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const existingItem = storedCart.find(
    (item) => item.product.id === product.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    storedCart.push({
      product,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(storedCart));
};