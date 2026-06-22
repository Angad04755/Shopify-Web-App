import { lazy, Suspense } from "react";
import { Route, Routes} from "react-router-dom"
const HomePage = lazy(() => import("../pages/HomePage"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const ProductDetailsPage = lazy(() => import("../pages/ProductdetailsPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const SigninPage = lazy(() => import("../pages/SigninPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));
const AuthLayout = lazy(() => import("../components/auth/AuthLayout"));

function AppRoutes() {
    return (
        <Suspense>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/sign-up" element={<SignupPage/>}/>
            <Route path="/sign-in" element={<AuthLayout/>}/>
            <Route path="/category/:slug" element={<CategoryPage/>}/>
            <Route path="/product/product-details/:id" element={<ProductDetailsPage/>}/>
        </Routes>
        </Suspense>
    )
}
export default AppRoutes