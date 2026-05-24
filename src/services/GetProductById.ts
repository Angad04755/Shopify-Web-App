import axios from "axios";
export async function fetchProduct(id: string) {
  const res = await axios.get(
    `https://dummyjson.com/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  return {
    product: res.data,
  }

};