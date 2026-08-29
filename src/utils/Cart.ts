// import { type Product } from "../types/Products";
// import { useSelector, useDispatch } from "react-redux";
// import { AddToCart } from "../redux/slices/cartSlice";
// import type { RootState, AppDispatch } from "../redux/store";
// export const Cart = (product: Product) => {
//   const items = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch<AppDispatch>();

//   dispatch(AddToCart(product.id))

//   localStorage.setItem("cart", JSON.stringify(items));
// };