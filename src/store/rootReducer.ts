import { combineReducers } from '@reduxjs/toolkit';
import bookReducer from './slices/bookSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
    books: bookReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
