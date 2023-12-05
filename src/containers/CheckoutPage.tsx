import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    Image,
    List,
    ListItem,
    Text,
    VStack,
} from '@chakra-ui/react';
import { RootState } from '../store/rootReducer';
import { removeFromCart, updateCart } from '../store/slices/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Book } from '../store/interfaces/book';

const CheckoutPage: React.FC = () => {
    const dispatch = useDispatch();

    const cartItems = useSelector((state: RootState) => state.cart.items);

    const handleCheckout = (bookId: number, newQuantity: number) => {
        dispatch(updateCart({ bookId, quantity: newQuantity }));
    };

    const removeItem = (book: Book) => {
        dispatch(removeFromCart(book));
    };

    const handlePayment = () => {
        // Handle payment here
        console.log('Payment handled.');
    };

    return (
        <VStack spacing={4} align="center">
            <Box p={4}>
                <List spacing={3}>
                    {cartItems.map((item, index) => (
                        <ListItem
                            key={index}
                            display="flex"
                            alignItems="center"
                        >
                            <Image src={item.book.image} boxSize="100px" />
                            <Text flex="1">{item.book.title}</Text>
                            <Text flex="1">
                                Precio: L.
                                {parseFloat(item.book.price).toFixed(2)}
                            </Text>
                            <Text flex="1">Cantidad: {item.quantity}</Text>
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                    handleCheckout(
                                        item.book.id,
                                        parseInt(e.target.value, 10)
                                    )
                                }
                            />
                            <Box pb={10}>
                                <Button
                                    background={'red.500'}
                                    colorScheme="red"
                                    height="20px"
                                    alignContent="center"
                                    onClick={() => removeItem(item.book)}
                                    leftIcon={<FontAwesomeIcon icon={faX} />}
                                />
                            </Box>
                        </ListItem>
                    ))}
                </List>
                <Text mt={4} fontSize="lg">
                    Precio Total: L.
                    {cartItems
                        .reduce(
                            (total, item) =>
                                total +
                                parseFloat(item.book.price) * item.quantity,
                            0
                        )
                        .toFixed(2)}
                </Text>
                {cartItems.length ? (
                    <Button mt={4} colorScheme="teal" onClick={handlePayment}>
                        Proceder a Pago
                    </Button>
                ) : null}
            </Box>
        </VStack>
    );
};

export default CheckoutPage;
