import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/global";
import { getAllProducts } from "../api/products";

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
      });
  },
});

const productsReducer = productsSlice.reducer;
export default productsReducer;
