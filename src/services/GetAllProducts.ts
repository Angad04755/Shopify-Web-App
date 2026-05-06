import axios from "axios";
export async function getAllProduct() {
  const res = await axios.get(
    `https://dummyjson.com/products?limit=0`
  );
  return res.data.products;
}