import ImageModel from '@/src/models/ImageModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: { images: ImageModel[], loading: boolean, error: any } = {
    images: [],
    loading: false,
    error: null,
}

const imageSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        addImage: (state, action: PayloadAction<ImageModel>) => {
            const image = action.payload;
            state.images.push(image);
        },

        setImages: (state, action: PayloadAction<ImageModel[]>) => {
            state.images = action.payload;
            // const images = [...state.images, ...action.payload];
            // return state;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});


export const { addImage, setImages, setLoading, setError } = imageSlice.actions;

export default imageSlice.reducer;