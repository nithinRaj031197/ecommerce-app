import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import modalsReducers from "./modalSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    products: productsReducer,
    cart: cartReducer,
    modals: modalsReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
