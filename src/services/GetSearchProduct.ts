import axios from "axios";
export async function searchProduct(query: string) {
  const res = await axios.get(
    `https://dummyjson.com/products/search?q=${query}`
  );
  return res.data.products;
}