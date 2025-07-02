import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
};

const slice = createSlice({
    name: 'psychologists',
    initialState,
});

export const psychologistsReducer = slice.reducer;
