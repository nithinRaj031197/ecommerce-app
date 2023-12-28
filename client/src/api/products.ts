import axios from "axios";

export const getAllProducts = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products");
    return res.data;
  } catch (error) {
    return error;
  }
};
