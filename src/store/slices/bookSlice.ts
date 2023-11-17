import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Book } from '../interfaces/book';

interface BookState {
    books: Book[];
    loading: boolean;
    error: string | null;
}

const initialState: BookState = {
    books: [],
    loading: false,
    error: null,
};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<Book[]>(
                'http://localhost:8080/books'
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const addBook = createAsyncThunk(
    'books/addBook',
    async (newBook: Book, { rejectWithValue }) => {
        try {
            const response = await axios.post<Book>(
                'http://localhost:8080/books',
                newBook
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch Books
        builder.addCase(fetchBooks.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(
            fetchBooks.fulfilled,
            (state, action: PayloadAction<Book[]>) => {
                state.books = action.payload;
                state.loading = false;
            }
        );
        builder.addCase(fetchBooks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        //Add Books
        builder.addCase(addBook.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(
            addBook.fulfilled,
            (state, action: PayloadAction<Book>) => {
                state.books.push(action.payload);
                state.loading = false;
            }
        );
        builder.addCase(addBook.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default bookSlice.reducer;
