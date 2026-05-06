import axios from "axios";

export async function getProductsByCategory(
  category: String,
  limit: number,
  skip: number
) {
  const res = await axios.get(
    `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
  );
  return res.data;
}
