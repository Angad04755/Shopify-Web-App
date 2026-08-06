export async function getAllCategory() {
  const res = await fetch("https://dummyjson.com/products/categories",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
    }
  }
  );
  return res.json();
}