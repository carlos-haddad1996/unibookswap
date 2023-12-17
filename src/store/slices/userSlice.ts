import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../interfaces/user';
import { CredentialResponse } from '@react-oauth/google';

interface UserState {
    users: User[];
    loggedUser: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loggedUser: null,
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get('http://localhost:8080/users');
        const users: User[] = response.data;
        return users;
    } catch (error: any) {
        throw new Error('failed to fetch users');
    }
});

export const loginWithGoogle = createAsyncThunk(
    'users/loginWithGoogle',
    async (response: CredentialResponse) => {
        try {
            const { data } = await axios.post(
                'http://localhost:8080/auth/login',
                {
                    token: response.credential,
                }
            );
            const loggedUser: User = data;
            return loggedUser;
        } catch (error: any) {
            throw new Error('failed to login');
        }
    }
);

export const logoutUser = () => (dispatch: any) => {
    dispatch(setUser(null));
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.loggedUser = action.payload;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch Users
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchUsers.fulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.users = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        // Fetch Google Login
        builder
            .addCase(loginWithGoogle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loginWithGoogle.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.loggedUser = action.payload;
                    state.loading = false;
                }
            )
            .addCase(loginWithGoogle.rejected, (state, action: any) => {
                state.loading = false;
                state.error =
                    action.payload.message || 'Login With Google failed';
            });
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
