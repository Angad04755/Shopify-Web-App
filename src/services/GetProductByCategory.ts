export async function getProductsByCategory(
  category: string,
  limit: number,
  skip: number
) {
  const res = await fetch(
    `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`,
    {
      method: "GET",
    }
  );
  return res.json();
}
