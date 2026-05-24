import axios from "axios";

export async function getAllCategory() {
  const res = await axios.get("https://dummyjson.com/products/categories",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
    }
  }
  );
  return res.data;
}