import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/features/auth/authSlice';
import { authApi } from 'src/services/auth/authService';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
