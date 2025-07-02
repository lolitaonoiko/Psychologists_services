import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, registerThunk } from './operations';

const initialState = {
    user: [],
    isLoading: false,

    isError: null,
};

const handlePending = state => {
    state.isLoading = true;
    state.isError = null;
};

const handleError = (state, action) => {
    state.isLoading = false;
    state.isError = action.payload;
};
const slice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                console.log(action.payload);

                state.user = action.payload;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                console.log(action.payload);

                state.user = action.payload;
            })
            .addMatcher(isAnyOf(registerThunk.pending, logoutThunk.pending, logoutThunk.pending, handlePending))
            .addMatcher(isAnyOf(registerThunk.rejected, loginThunk.rejected, logoutThunk.rejected), handleError);
    },
});

export const authReducer = slice.reducer;
