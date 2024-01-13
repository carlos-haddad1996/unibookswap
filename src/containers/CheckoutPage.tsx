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
    Stack,
    Flex,
    Heading,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Divider,
    IconButton,
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
            <Box p={4} w="full" maxW="md">
                <Stack spacing={6}>
                    {cartItems.map((item, index) => (
                        <Box
                            key={index}
                            p={4}
                            border="1px"
                            borderRadius="md"
                            borderColor="gray.200"
                        >
                            <Flex align="center">
                                <Image
                                    src={item.book.image}
                                    boxSize="100px"
                                    mr={4}
                                />
                                <VStack align="start" flex="1">
                                    <Heading size="md">
                                        {item.book.title}
                                    </Heading>
                                    <Text>
                                        Precio: L.
                                        {parseFloat(item.book.price).toFixed(2)}
                                    </Text>
                                    <Text>Cantidad:</Text>
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
                                </VStack>
                                <IconButton
                                    icon={<FontAwesomeIcon icon={faX} />}
                                    aria-label="delete-icon"
                                    colorScheme="red"
                                    onClick={() => removeItem(item.book)}
                                />
                            </Flex>
                        </Box>
                    ))}
                </Stack>
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
                ) : (
                    <Text mt={4}>El carrito esta vacío</Text>
                )}
            </Box>
        </VStack>
    );
};

export default CheckoutPage;
