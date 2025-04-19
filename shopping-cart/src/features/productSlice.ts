import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types";
const initialState = {
    products: [] as Product[],
    cart: [] as Product[],
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        addToCart: (state, action: PayloadAction<Product>) => {
            state.cart.push(action.payload);
        },
        setCart: (state, action: PayloadAction<Product[]>) => {
            state.cart = action.payload;
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        }
    }
})

export const { setProducts, addToCart, setCart, removeFromCart } = productSlice.actions;
export default productSlice.reducer;