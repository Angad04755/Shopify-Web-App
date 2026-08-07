import ProductCard from "../ui/ProductCard";
import { getProductsByCategory } from "../../services/GetProductByCategory";
import { useState, useEffect, useMemo } from "react";
import type { Product } from "../../types/Products";
import { toast } from "sonner";
interface RelatedProductsProps {
    product: Product,
}

function RelatedProducts({ product }: RelatedProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);

     useEffect(() => {
    if (!product) {
      return;
    }

    const getProducts = async () => {
      try {
      const data = await getProductsByCategory(product.category, 5, 0);
      setProducts(data.products);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    getProducts();
  }, [])

   const relatedProducts = useMemo(() => products.filter((item) => item.id !== product.id), [products]);


  if (!products) {
    return (
        <section className="mx-auto container p-8">
            <p className="animate-pulse text-gray-700 text-lg">Coundn't load realated products</p>
        </section>
    )
  }

  
    return (
        <section className="mx-auto container p-8">
        <article className="mt-5">
        <h2 className="text-xl text-gray-700 font-semibold">Related Products</h2>
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          {relatedProducts.filter((item) => item.id !== product.id).map((item) => (
    <ProductCard key={item.id} product={item} />
  ))}
        </div>
      </article>
      </section>
    )
}
export default RelatedProducts;