import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './authActions';

const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null;

export interface CounterState {
    loading: boolean;
    userInfo: object | null;
    userToken: string | null;
    error: string | null;
    success: boolean;
};

const initialState: CounterState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken');
            state.loading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || null;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // TODO: fix any
            .addCase(loginUser.fulfilled, (state, { payload }: { payload: any }) => {
                state.loading = false;
                state.userInfo = payload;
                state.userToken = payload && payload.userToken;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || null;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;