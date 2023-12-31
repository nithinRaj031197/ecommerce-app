import axios from "axios";

export const getAllProducts = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getSingleProduct = async (productId: number) => {
  try {
    const res = await axios.get(`https://dummyjson.com/products/${productId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getSearchedProducts = async (value: string) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${value}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
