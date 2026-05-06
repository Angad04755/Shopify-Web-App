import { lazy, Suspense } from "react";
const ProductDetails = lazy(() => import("../components/product/productDetails"));

function ProductdetailsPage() {
    return (
        <Suspense>
            <ProductDetails/>
        </Suspense>
    )
}

export default ProductdetailsPage;