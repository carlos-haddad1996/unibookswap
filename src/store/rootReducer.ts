import { combineReducers } from '@reduxjs/toolkit';
import bookReducer from './slices/bookSlice';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';

const rootReducer = combineReducers({
    books: bookReducer,
    user: userReducer,
    cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
