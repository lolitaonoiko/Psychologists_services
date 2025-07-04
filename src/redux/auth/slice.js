import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { loginThunk, logoutThunk, registerThunk } from './operations';

const initialState = {
    user: null,
    isLoading: false,
    isLoggedIn: false,
};

const handlePending = state => {
    state.isLoading = true;
};

const slice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(logoutThunk.fulfilled, state => {
                state.user = null;
                state.isLoading = false;
                state.isLoggedIn = false;
            })
            .addCase(registerThunk.rejected, state => {
                state.isLoading = false;
            })
            .addCase(loginThunk.rejected, state => {
                state.isLoading = false;
            })
            .addCase(logoutThunk.rejected, state => {
                state.isLoading = false;
            })
            .addMatcher(isAnyOf(registerThunk.pending, logoutThunk.pending, loginThunk.pending), handlePending);
    },
});

export const authReducer = slice.reducer;
