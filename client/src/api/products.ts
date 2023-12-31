import { loadStripe } from "@stripe/stripe-js";
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

export const stripePayment = async (lineItems: any) => {
  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);
  try {
    const response = await axios.post("http://localhost:5001/checkout", { line_items: lineItems });
    const data = response.data;

    const stripe = await stripePromise;

    await stripe?.redirectToCheckout({ sessionId: data.id });
  } catch (error) {
    return error;
  }
};
