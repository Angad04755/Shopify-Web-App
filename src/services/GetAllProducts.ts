export async function getAllProduct() {
  const res = await fetch(
    `https://dummyjson.com/products?limit=0`
  , {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.json();
}