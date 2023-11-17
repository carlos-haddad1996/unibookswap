import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../interfaces/user';

interface UserState {
    users: User[];
    user: User | null;
    loading: boolean;
    // logged: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    user: null,
    loading: false,
    // logged: true,
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

export const loginUser = createAsyncThunk(
    'user/login',
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue, dispatch, getState }
    ) => {
        try {
            await dispatch(fetchUsers());
            const state = getState() as { user: UserState };
            const users = state.user.users;
            const matchingUser = users.find(
                (user) => user.email === email && user.password === password
            );

            if (matchingUser) {
                console.log('Successful');
                return matchingUser;
            } else {
                console.log('Login failed');
                return rejectWithValue({ message: 'Invalid credentials ' });
            }
        } catch (error: any) {
            return rejectWithValue({ message: 'Login failed' });
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (newUser: User, { rejectWithValue }) => {
        try {
            console.log({ newUser });
            const response = await axios.post<User>(
                'http://localhost:8080/users',
                newUser
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Register User
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                // state.logged = false;
                state.error = null;
            })
            .addCase(
                registerUser.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.user = action.payload;
                    state.loading = false;
                    // state.logged = true;
                }
            )
            .addCase(registerUser.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload.message || 'Registration failed';
            });

        // Login
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
            .addCase(fetchUsers.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload.message || 'Failed to fetch users';
            });
    },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
