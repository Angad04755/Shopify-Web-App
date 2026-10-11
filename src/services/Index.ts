
import Api from "./api";
import Routes from "./routes";



export const getAllProduct = async () => {
  const response = await Api.get(
    Routes.get_Products.route,
    {
      params: {
        limit: 0,
      },
    }
  );

  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await Api.get(
    Routes.get_Product_By_Id.route(id)
  );
  return response.data;
};

export const getAllCategory = async () => {
  const response = await Api.get(
    Routes.get_Categories.route
  );

  return response.data;
};

export const getProductsByCategory = async (
  category: string,
  limit: number,
  skip: number
) => {
  const response = await Api.get(
    Routes.get_Products_By_Category.route(category),
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
  const response = await Api.get(
    Routes.search_Products.route,
    {
      params: {
        q: query,
      },
    }
  );

  return response.data;
};