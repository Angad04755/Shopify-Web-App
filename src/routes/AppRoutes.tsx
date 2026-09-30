import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
const HomePage = lazy(() => import("../pages/HomePage"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const ProductDetailsPage = lazy(
  () => import("../pages/ProductdetailsPage")
);
const CartPage = lazy(() => import("../pages/CartPage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const AuthLayout = lazy(() => import("../components/auth/AuthLayout"));
const WishlistPage = lazy(
  () => import("../components/wishlist/WishlistPage")
);

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
        {
            index: true,
            element: <HomePage/>
        },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/sign-in",
    element: <AuthLayout />,
  },
  {
    path: "/category/:slug",
    element: <CategoryPage />,
  },
  {
    path: "/product/product-details/:id",
    element: <ProductDetailsPage />,
  },
  {
    path: "/wishlist",
    element: <WishlistPage />,
  },
    ]
}]);

export default AppRoutes;