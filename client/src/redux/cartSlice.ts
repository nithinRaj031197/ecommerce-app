import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CartProduct {
  productId: number;
  quantity: number;
  price: number;
  originalPrice: number;
  discountPrice: number;
  originalDiscountPrice: number;
}

export type CartState = {
  products: CartProduct[];
  total: number;
  discountTotal: number;
};

const initialState: CartState = {
  products: [],
  total: 0,
  discountTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<{ productId: number; price: number; discountPrice: number }>) => {
      const { productId, price, discountPrice } = action.payload;

      const cartProduct = state.products?.find((prod) => prod.productId === productId);

      let newCartProduct: CartProduct;

      if (cartProduct) {
        cartProduct.quantity += 1;
        newCartProduct = cartProduct;
        return;
      }
      state.total += price;
      state.discountTotal += discountPrice;

      newCartProduct = {
        productId,
        quantity: 1,
        price,
        originalPrice: price,
        discountPrice,
        originalDiscountPrice: discountPrice,
      };

      state.products.push(newCartProduct);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantityType: "increment" | "decrement" }>) => {
      const { quantityType, productId } = action.payload;

      const cartProduct = state.products?.find((prod) => prod.productId === productId);

      if (cartProduct) {
        if (quantityType === "increment") {
          cartProduct.quantity += 1;
          cartProduct.price = cartProduct.originalPrice * cartProduct.quantity;
          state.total += cartProduct.originalPrice;
          cartProduct.discountPrice = cartProduct.originalDiscountPrice + cartProduct.quantity;
          state.discountTotal += cartProduct.originalDiscountPrice;
        } else if (quantityType === "decrement") {
          cartProduct.quantity -= 1;
          cartProduct.price = cartProduct.price - cartProduct.originalPrice;
          state.total -= cartProduct.originalPrice;

          cartProduct.discountPrice = cartProduct.discountPrice - cartProduct.originalDiscountPrice;
          state.discountTotal -= cartProduct.originalDiscountPrice;
        }
      }
    },
  },
});

export const { addCart, updateQuantity } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
