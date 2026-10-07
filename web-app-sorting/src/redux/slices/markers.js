import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPlaces = createAsyncThunk('sort-places/fetchPlaces', async () => {
    const { data } = await axios.get('/sort-places'); 
    return data;
});

export const setFilteredPlaces = createAsyncThunk('sort-places/setFilteredPlaces', async (selectedCategory) => {
    if (selectedCategory === '') {
        const { data } = await axios.get('/sort-places');
        return data;
    } else {
        const response = await axios.get(`/sort-places/${selectedCategory}`);
        return response.data;
    }
});


const initialState = {
    sortPlaces: {
        items: [],
        status: 'loading', 
    }
};

const placesSlice = createSlice({
    name: 'sort-places',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaces.pending, (state) => {
                state.sortPlaces.status = 'loading'; 
            })
            .addCase(fetchPlaces.fulfilled, (state, action) => {
                state.sortPlaces.items = action.payload; 
                state.sortPlaces.status = 'loaded'; 
            })
            .addCase(fetchPlaces.rejected, (state, action) => {
                state.sortPlaces.items = [];
                state.sortPlaces.status = 'error'; 
            })
            .addCase(setFilteredPlaces.fulfilled, (state, action) => {
                state.sortPlaces.items = action.payload; 
                state.sortPlaces.status = 'loaded';
            })
            .addCase(setFilteredPlaces.rejected, (state, action) => {
                state.sortPlaces.items = [];
                state.sortPlaces.status = 'error'; 
            });
    }
});

export const sortPlacesReducer = placesSlice.reducer;