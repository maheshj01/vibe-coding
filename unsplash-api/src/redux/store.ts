import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./images/imageSlice";

const store = configureStore({
    reducer: imageReducer
});

export type RootState = ReturnType<typeof store.getState>;
export default store;