import { lazy, Suspense } from "react";
const CategoryProducts = lazy(() => import("../components/product/DesktopProducts"));

function CategoryPage() {
    return (
        <Suspense>
            <CategoryProducts/>
        </Suspense>
    )
}

export default CategoryPage;