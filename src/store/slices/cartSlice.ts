import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../interfaces/book';

interface CartItem {
    book: Book;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const book = action.payload.book;
            const item = state.items.find((i) => i.book.id === book.id);
            if (!item) {
                state.items.push({ book, quantity: 1 });
            } else {
                item.quantity++;
            }
            state.totalQuantity++;
            state.totalPrice += +book.price;
        },
        removeFromCart(state, action: PayloadAction<Book>) {
            const book = action.payload;
            const item = state.items.find((i) => i.book.id === book.id);
            if (item) {
                if (item.quantity === 1) {
                    state.items = state.items.filter(
                        (i) => i.book.id !== book.id
                    );
                } else {
                    item.quantity--;
                }
                state.totalQuantity--;
                state.totalPrice -= +book.price;
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
