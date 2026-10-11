
import api from "./api";
import routes from "./routes";


export const getAllProduct = async () => {
  const response = await api.get(
    routes.get_Products.route,
    {
      params: {
        limit: 0,
      },
    }
  );

  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get(
    routes.get_Product_By_Id.route(id)
  );

  return response.data;
};

export const getAllCategory = async () => {
  const response = await api.get(
    routes.get_Categories.route
  );

  return response.data;
};

export const getProductsByCategory = async (
  category: string,
  limit: number,
  skip: number
) => {
  const response = await api.get(
    routes.get_Products_By_Category.route(category),
    {
      params: {
        limit,
        skip,
      },
    }
  );

  return response.data;
};

export const searchProduct = async (query: string) => {
  const response = await api.get(
    routes.search_Products.route,
    {
      params: {
        q: query,
      },
    }
  );

  return response.data;
};