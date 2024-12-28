import ImageModel from '@/src/models/ImageModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: { images: ImageModel[], loading: boolean, error: any, page: number, endOfList: boolean } = {
    images: [],
    loading: false,
    error: null,
    page: 1,
    endOfList: false
}

const imageSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        setEndOfList: (state, action: PayloadAction<boolean>) => {
            state.endOfList = action.payload;
        },
        addImage: (state, action: PayloadAction<ImageModel>) => {
            const image = action.payload;
            state.images.push(image);
        },
        addImages: (state, action: PayloadAction<ImageModel[]>) => {
            const images = action.payload;
            state.images.push(...images);
        },
        setImages: (state, action: PayloadAction<ImageModel[]>) => {
            state.images = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});


export const { addImage, setImages, setLoading, setError, addImages, setEndOfList } = imageSlice.actions;

export default imageSlice.reducer;