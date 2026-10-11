
const routes = {
  get_Products: {
    route: "/products",
  },

  get_Product_By_Id: {
    route: (id: string) => `/products/${id}`,
  },

  get_Products_By_Category: {
    route: (category: string) =>
      `/products/category/${encodeURIComponent(category)}`,
  },

  search_Products: {
    route: "/products/search",
  },

  get_Categories: {
    route: "/products/categories",
  },
};

export default routes;