import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { loginThunk, logoutThunk, registerThunk } from './operations';

const initialState = {
    user: null,
    isLoading: false,
    isLoggedIn: false,
    modals: {
        loginModal: false,
        registerModal: false,
        appointmentModal: false,
    },
};

const handlePending = state => {
    state.isLoading = true;
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        openFormModal: (state, action) => {
            if (action.payload === 'Login') {
                state.modals.loginModal = true;
            }
            if (action.payload === 'Registration') {
                state.modals.registerModal = true;
            }
        },
        closeFormModal: state => {
            state.modals.loginModal = false;
            state.modals.registerModal = false;
        },
        openAppointmentModal: state => {
            state.modals.appointmentModal = true;
        },
        closeAppointmentModal: state => {
            state.modals.appointmentModal = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);

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

export const { openFormModal, closeFormModal, openAppointmentModal, closeAppointmentModal } = slice.actions;

export const authReducer = slice.reducer;
