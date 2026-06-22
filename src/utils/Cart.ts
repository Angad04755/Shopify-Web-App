import { type Product } from "../types/Products";
import { type CartItem } from "../types/CartItem";


export const Cart = (product: Product) => {
  const storedCart: CartItem[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const existingItem = storedCart.find(
    (item) => item.product.id === product.id
  );

  let updatedCart: CartItem[];

  if (existingItem) {
    existingItem.quantity = existingItem.quantity + 1;
    updatedCart = storedCart;
  } else {
    updatedCart = [
      ...storedCart,
      {
        product,
        quantity: 1,
      },
    ];
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart));
};