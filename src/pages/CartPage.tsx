import { lazy, Suspense } from "react";
const Cart = lazy(() => import("../components/cart/CartPage"))
function CartPage() {
    return (
        <Suspense>
            <Cart/>
        </Suspense>
    )
}
export default CartPage;