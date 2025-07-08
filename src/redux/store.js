import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './auth/slice';
import { psychologistsReducer } from './psychologists/slice';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'isLoggedIn', 'modals'],
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    psychologists: psychologistsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
