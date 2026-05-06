import axios from "axios";

export async function getAllCategory() {
  const res = await axios.get("https://dummyjson.com/products/categories");
  return res.data;
}