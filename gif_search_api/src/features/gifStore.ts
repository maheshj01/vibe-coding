import { configureStore } from "@reduxjs/toolkit";
import gifReducer from "./gifSlice";

const store = configureStore({
    reducer: {
        gifs: gifReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;


