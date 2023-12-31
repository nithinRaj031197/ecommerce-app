import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/global";
import { getAllProducts, getSearchedProducts, getSingleProduct } from "../api/products";

export type ProductsState = {
  status: "idle" | "loading" | "success" | "error";
  products: Product[];
  error: null | string;
};

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchAllProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const productsData = await getAllProducts();

      return productsData.products;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch products.");
    }
  }
);

export const fetchSingleProduct = createAsyncThunk<Product, number, { rejectValue: string }>(
  "product/fetchSingleProduct",
  async (productId, thunkAPI) => {
    try {
      const singleProduct = await getSingleProduct(productId);

      return singleProduct;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch products.");
    }
  }
);

export const fetchSearchedProducts = createAsyncThunk<Product[], string, { rejectValue: string }>(
  "product/searchProducts",
  async (value, thunkAPI) => {
    try {
      const searchedProducts = await getSearchedProducts(value);
      return searchedProducts.products;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch searched Products");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload || [];
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? "Failed to fetch products.";
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "loading"; // Set loading status
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "success"; // Set success status
        state.products = [action.payload]; // Store single product in products array or use a separate field for a single product
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = "error"; // Set error status
        state.error = action.payload ?? "Failed to fetch product"; // Set error message
      })
      .addCase(fetchSearchedProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchedProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload || [];
      })
      .addCase(fetchSearchedProducts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? "Failed to fetch products.";
      });
  },
});

const productsReducer = productsSlice.reducer;
export default productsReducer;
