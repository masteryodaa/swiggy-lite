import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice"

const store = configureStore({
    reducer: {
        cart: cartSlice // name of the slice and the slice itself
    }
});

export default store;