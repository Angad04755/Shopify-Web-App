import Api from "./Api";
import Routes from "./Routes";
export const getAllProduct = async () => {
    const response = await Api.get(Routes.get_Products.route, {
        params: {
            limit: 0,
        },
    });
    return  response.data
}

export async function getPrductById(id: string) {
  const response = await Api.get(
    Routes.get_Product_By_Id.route(id)
  );

  return response.data;
}


export async function getAllCategory() {
  const response = await Api.get(Routes.get_Categories.route);

  return response.data;
}

export const getProductsByCategory = async (category: string, limit: number, skip: number) => {
    const response = await Api.get(Routes.get_Products_By_Category.route(category), {
        params: {
            limit: limit,
            skip: skip,
        },
    })
    return response.data;
}

export async function searchProduct(query: string) {
  const response = await Api.get(
    Routes.search_Products.route,
    {
      params: {
        q: query,
      },
    }
  );

  return response.data;
}