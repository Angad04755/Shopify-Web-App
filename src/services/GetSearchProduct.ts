export async function searchProduct(query: string) {
  const res = await fetch(
    `https://dummyjson.com/products/search?q=${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }

  );
  return res.json();
}