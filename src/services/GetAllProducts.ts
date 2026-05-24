import axios from "axios";
export async function getAllProduct() {
  const res = await axios.get(
    `https://dummyjson.com/products?limit=0`
  , {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.data.products;
}