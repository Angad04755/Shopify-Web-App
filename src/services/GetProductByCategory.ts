export async function getProductsByCategory(
  category: string,
  limit: number,
  skip: number
) {
  const res = await fetch(
    `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"        
      }
    }
  );

  if (res.status !== 200) {
    throw new Error("Something wrong")
  }
  return res.json();
}
