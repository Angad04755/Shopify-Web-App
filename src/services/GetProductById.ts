export async function fetchProduct(id: string) {
  const res = await fetch(
    `https://dummyjson.com/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (res.status !== 200) {
      throw new Error("Couldn't Get the product currently")
    }
    return res.json();

};