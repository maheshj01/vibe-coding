import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import GifModel from "../GifModel";

const initialState: GifModel[] = [];

const gifSlice = createSlice({
    name: "gifs",
    initialState,
    reducers: {
        setGifs: (state, action: PayloadAction<GifModel[]>) => {
            return action.payload;
        },
        addGifs: (state, action: PayloadAction<GifModel[]>) => {
            return [...state, ...action.payload];
        },
    }
});

export const { setGifs, addGifs } = gifSlice.actions;
export default gifSlice.reducer;