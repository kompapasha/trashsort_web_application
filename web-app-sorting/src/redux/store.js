import { configureStore } from "@reduxjs/toolkit";
import { articlesReducer } from "./slices/article";
import { authReducer } from "./slices/auth";
import { sortPlacesReducer } from "./slices/markers";

const store = configureStore({
    reducer: {
        articles: articlesReducer,
        auth: authReducer,
        sortPlaces: sortPlacesReducer,
    }
})

export default store;