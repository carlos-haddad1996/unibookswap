import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    createAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { Book, BookUpdate, BookUpload } from '../interfaces/book';

interface BookState {
    books: Book[];
    booksByUser: Book[];
    authors: string[];
    categories: string[];
    loading: boolean;
    successMessage: string | null;
    failMessage: string | null;
    error: string | null;
}

const initialState: BookState = {
    books: [],
    booksByUser: [],
    authors: [],
    categories: [],
    loading: false,
    successMessage: null,
    failMessage: null,
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

export const fetchAuthors = createAsyncThunk(
    'books/fetchAuthors',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'http://localhost:8080/books/authors'
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCategories = createAsyncThunk(
    'books/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<string[]>(
                'http://localhost:8080/books/categories'
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchBooksByUser = createAsyncThunk(
    'books/fetchBooksByUser',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/books/user/${userId}`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const addBook = createAsyncThunk(
    'books/addBook',
    async (
        { userId, newBook }: { userId: string; newBook: BookUpload },
        { rejectWithValue, dispatch }
    ) => {
        try {
            const formData = new FormData();
            formData.append('title', newBook.title);
            formData.append('author', newBook.author);
            formData.append('price', newBook.price);
            formData.append('description', newBook.description);
            formData.append('category', newBook.category);
            formData.append('image', newBook.image);

            const response = await axios.post(
                `http://localhost:8080/books/${userId}`,
                formData
            );

            dispatch(
                setSuccessMessage({
                    message: `El libro "${newBook.title}" fue subido exitosamente`,
                })
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateBook = createAsyncThunk(
    'books/updateBook',
    async (
        {
            userId,
            bookId,
            updatedBook,
        }: { userId: string; bookId: number; updatedBook: BookUpdate },
        { rejectWithValue, dispatch }
    ) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/books/${bookId}/user/${userId}`,
                updatedBook
            );

            dispatch(
                setSuccessMessage({
                    message: `El libro "${updatedBook.title}" fue actualizado exitosamente`,
                })
            );

            return response.data;
        } catch (error: any) {
            console.log({ error });
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    async (
        { userId, bookId }: { userId: string; bookId: number },
        { rejectWithValue, dispatch }
    ) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/books/${bookId}/user/${userId}`
            );

            dispatch(
                setSuccessMessage({
                    message: `El libro fue eliminado exitosamente`,
                })
            );

            return response.data;
        } catch (error: any) {
            console.log({ error });
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const setSuccessMessage = createAction<{ message: string | null }>(
    'books/setSuccessMessage'
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

        // Fetch Authors
        builder
            .addCase(fetchAuthors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAuthors.fulfilled,
                (state, action: PayloadAction<string[]>) => {
                    state.authors = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAuthors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Categories
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchCategories.fulfilled,
                (state, action: PayloadAction<string[]>) => {
                    state.categories = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        //Fetch Books by User
        builder
            .addCase(fetchBooksByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchBooksByUser.fulfilled,
                (state, action: PayloadAction<Book[]>) => {
                    state.booksByUser = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchBooksByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        //Add Books
        builder
            .addCase(addBook.pending, (state) => {
                state.loading = true;
                state.successMessage = null;
                state.error = null;
            })
            .addCase(addBook.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = null;
                state.error = null;
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.failMessage = action.payload as string;
            })
            .addCase(
                setSuccessMessage,
                (state, action: PayloadAction<{ message: string | null }>) => {
                    state.successMessage = action.payload.message;
                }
            );

        //Update Books
        builder
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
                state.successMessage = null;
                state.error = null;
            })
            .addCase(updateBook.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = null;
                state.error = null;
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.failMessage = action.payload as string;
            });
    },
});

export default bookSlice.reducer;
