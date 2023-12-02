import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../interfaces/book';
import { RootState } from '../rootReducer';

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

export const selectCartTotalPrice = createSelector(
    (state: RootState) => state.cart.items,
    (items) => {
        return items
            .reduce((total, item) => {
                return total + parseFloat(item.book.price) * item.quantity;
            }, 0)
            .toFixed(2);
    }
);

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
        updateCart(
            state,
            action: PayloadAction<{ bookId: number; quantity: number }>
        ) {
            const { bookId, quantity } = action.payload;
            const item = state.items.find((i) => i.book.id === bookId);
            if (item) {
                state.totalQuantity += quantity - item.quantity;
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateCart } =
    cartSlice.actions;
export default cartSlice.reducer;
