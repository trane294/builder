import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL = 'http://127.0.0.1:3000';

export interface RegisterUserArgs {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
    remember?: string;
}

interface LoginUserArgs {
    firstName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

interface ErrorResponse {
    message: string;
}

export const registerUser = createAsyncThunk<
    void,
    RegisterUserArgs,
    {
        rejectValue: string;
    }
>('auth/register', async (data: RegisterUserArgs, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        await axios.post<ErrorResponse>(
            `${backendURL}/api/user/register`,
            data,
            config
        );
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const loginUser = createAsyncThunk<
    void,
    LoginUserArgs,
    {
        rejectValue: string;
    }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            `${backendURL}/api/user/login`,
            { email, password },
            config
        );

        localStorage.setItem('userToken', data.userToken);

        return data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
