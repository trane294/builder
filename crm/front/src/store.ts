import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/features/auth/authSlice';
import { authApi } from 'src/services/auth/authService';
import { websiteApi } from './services/website/websiteService';
import modalReducer from 'src/features/modal/modalSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [websiteApi.reducerPath]: websiteApi.reducer,
        modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(websiteApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
