import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/features/auth/authSlice';
import modalReducer from 'src/features/modal/modalSlice';
import { authApi } from 'src/services/auth/authService';
import { websiteApi } from 'src/services/website/websiteService';
import { subscriptionApi } from 'src/services/subscription/subscriptionService';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [websiteApi.reducerPath]: websiteApi.reducer,
        [subscriptionApi.reducerPath]: subscriptionApi.reducer,
        modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            websiteApi.middleware,
            authApi.middleware,
            subscriptionApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
