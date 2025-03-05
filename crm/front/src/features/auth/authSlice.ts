import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './authActions';
import { appLogin, appLogout } from 'src/auth';
import { IUser } from 'src/types';

const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null;


export interface CounterState {
    loading: boolean;
    userInfo: IUser | null;
    userToken: string | null;
    error: string | null;
    success: boolean;
}

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
        setUserDetails: (state, action: PayloadAction<IUser>) => {
            state.userInfo = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('userToken');
            state.loading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
            state.success = false;
            appLogout();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(
                registerUser.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || null;
                }
            )
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // TODO: fix any
            .addCase(
                loginUser.fulfilled,
                (state, { payload }: { payload: any }) => {
                    state.loading = false;
                    state.userInfo = payload;
                    state.userToken = payload && payload.userToken;
                    appLogin();
                }
            )
            .addCase(
                loginUser.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || null;
                }
            );
    },
});

export const { logout, setUserDetails } = authSlice.actions;
export default authSlice.reducer;
