import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
    const { data } = await axios.get('/articles');
    return data.reverse();
});

export const fetchRemoveArticle = createAsyncThunk('articles/fetchRemoveArticle', async (id) => {
    axios.delete(`/articles/${id}`);
});

const initialState = {
    articles: {
        items: [],
        status: 'loading',
    }
}

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.articles.status = 'loading';
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.articles.items = action.payload;
                state.articles.status = 'loaded';
            })
            .addCase(fetchArticles.rejected, (state) => {
                state.articles.items = [];
                state.articles.status = 'error';
            })
            .addCase(fetchRemoveArticle.pending, (state, action) => {
                state.articles.items = state.articles.items.filter(obj => obj._id !== action.meta.arg);
            })
            .addCase(fetchRemoveArticle.rejected, (state) => {
                state.articles.status = 'error';
            });
    }
});

export const articlesReducer = articlesSlice.reducer;

/*
    extraReducers: {
        [fetchArticles.pending]: (state) => {
            state.articles.status = 'loading';
        },
        [fetchArticles.fulfilled]: (state, action) => {
            state.articles.items = action.payload;
            state.articles.status = 'loaded';
        },
        [fetchArticles.rejected]: (state) => {
            state.articles.items = [];
            state.articles.status = 'error';
        }
    }
*/