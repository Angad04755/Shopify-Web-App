import axios from "axios";
export async function fetchProduct(id: string) {
  const res = await axios.get(
    `https://dummyjson.com/products/${id}`);
  return {
    product: res.data,
  }

};