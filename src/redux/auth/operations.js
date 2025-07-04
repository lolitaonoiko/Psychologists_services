import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { auth } from '../../api/firebase';

export const registerThunk = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
    try {
        const data = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

        if (credentials.displayName) {
            await updateProfile(data.user, {
                displayName: credentials.displayName,
                photoURL: credentials.photoURL || null,
            });
        }
        const user = {
            uid: data.user.uid,
            name: data.user.displayName || credentials.displayName || null,
            email: data.user.email,
            photoURL: data.user.photoURL || credentials.photoURL || null,
            phoneNumber: data.user.phoneNumber,
        };

        toast.success('Registration successful!');

        return user;
    } catch (error) {
        let errorMessage = 'Registration error';

        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already in use';
                break;
            case 'auth/weak-password':
                errorMessage = 'Weak password';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email';
                break;
            default:
                errorMessage = error.message;
        }
        toast.error(errorMessage);
        return thunkAPI.rejectWithValue(errorMessage);
    }
});
export const loginThunk = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const data = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);

        const user = {
            uid: data.user.uid,
            name: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL,
            phoneNumber: data.user.phoneNumber,
        };

        toast.success('Login successful!');

        return user;
    } catch (error) {
        let errorMessage = 'Login error';

        switch (error.code) {
            case 'auth/wrong-password':
            case 'auth/invalid-email':
            case 'auth/invalid-credential':
                errorMessage = 'Invalid email or password';
                break;
            case 'auth/user-not-found':
                errorMessage = 'User not found';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many requests. Try again later';
                break;
            default:
                errorMessage = error.message;
        }

        toast.error(errorMessage);

        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await signOut(auth);

        toast.success('You have successfully logged out');
    } catch (error) {
        toast.error('Logout error');

        return thunkAPI.rejectWithValue(error.message);
    }
});
