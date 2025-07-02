import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../api/firebase';
import { toast } from 'react-toastify';

export const registerThunk = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
    try {
        const data = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

        const user = {
            uid: data.user.uid,
            name: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL,
            phoneNumber: data.user.phoneNumber,
        };

        await updateProfile(data.user, {
            displayName: data.user.displayName,
            photoURL: data.user.photoURL || null,
        });

        return user;
    } catch (error) {
        let errorMessage = 'Registration error';

        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email already in use';
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

        await updateProfile(data.user, {
            displayName: data.user.displayName,
            photoURL: data.user.photoURL || null,
        });

        return user;
    } catch (error) {
        let errorMessage = 'Login error';

        switch (error.code) {
            case 'auth/wrong-password':
            case 'auth/invalid-email':
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
