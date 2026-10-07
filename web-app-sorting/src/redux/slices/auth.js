import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
})

export const fetchForgotPassword = createAsyncThunk('auth/fetchForgotPassword', async (email) => {
    const { data } = await axios.post('/auth/forgot-password', { email });
    return data;
});

export const fetchResetPassword = createAsyncThunk('auth/fetchResetPassword', async ({ id, token, password }) => {
    const { data } = await axios.post(`/auth/reset-password/${id}/${token}`, { password });
    return data;
});

export const deleteUserAccount = createAsyncThunk('auth/deleteUserAccount', async (_, { dispatch }) => {
    const token = window.localStorage.getItem('token');
    await axios.delete('/auth/delete-account', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(logout());
});

const initialState = {
    data: null,
    status: 'loading',
    isAuthMenuOpen: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleAuthMenu: (state) => {
            state.isAuthMenuOpen = !state.isAuthMenuOpen;
        },
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchForgotPassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchForgotPassword.fulfilled, (state, action) => {
                state.status = 'loaded';
            })
            .addCase(fetchForgotPassword.rejected, (state) => {
                state.status = 'error';
            })
            .addCase(fetchResetPassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchResetPassword.fulfilled, (state, action) => {
                state.status = 'loaded';
            })
            .addCase(fetchResetPassword.rejected, (state) => {
                state.status = 'error';
            })
            .addCase(deleteUserAccount.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteUserAccount.fulfilled, (state) => {
                state.status = 'idle';
                state.data = null;
            })
            .addCase(deleteUserAccount.rejected, (state) => {
                state.status = 'error';
            });
    }
})


export const selectIsAuth = state => Boolean(state.auth.data);
export const { toggleAuthMenu, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;


/*
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
})

const initialState = {
    data: null,
    status: 'loading',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            });
    }
})

export const authReducer = authSlice.reducer;
*/