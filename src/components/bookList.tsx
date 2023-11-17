// components/BookList.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../store/slices/bookSlice';
import { RootState } from '../store/rootReducer';
import { ThunkDispatch } from 'redux-thunk';

const BookList = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();
    const { books, loading, error } = useSelector(
        (state: RootState) => state.books
    );

    useEffect(() => {
        // Fetch books when the component mounts
        dispatch(fetchBooks());
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
