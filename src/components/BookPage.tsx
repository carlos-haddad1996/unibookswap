import React, { useState } from 'react';
import { Book } from '../store/interfaces/book';
import { useParams } from 'react-router-dom';
import {
    VStack,
    Heading,
    Button,
    Box,
    Image,
    Text,
    Grid,
    GridItem,
    HStack,
    Spacer,
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    useToast,
} from '@chakra-ui/react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { RootState } from '../store/rootReducer';

interface BookPageProps {
    books: Book[];
}

const BookPage: React.FC<BookPageProps> = ({ books }) => {
    const dispatch = useDispatch();
    const toast = useToast();

    const { bookId } = useParams<{ bookId: string }>();

    const { items } = useSelector((state: RootState) => state.cart);

    const selectedBook = books.find((book) => book.id === Number(bookId));

    const [quantity, setQuantity] = useState<number>(1);

    console.log({ items });
    console.log({ quantity });

    if (!selectedBook) {
        return <div>Book not found.</div>;
    }

    const handleAddToCart = () => {
        if (selectedBook) {
            dispatch(addToCart({ book: selectedBook, quantity }));
            toast({
                title: 'Success',
                description: 'Item added to cart successfully.',
                status: 'success',
                duration: 1500,
                isClosable: true,
            });
            setQuantity(1);
        }
    };

    return (
        <VStack spacing={4} align="center" p={4}>
            <Flex align="center" justify="center">
                <VStack marginRight="100px">
                    {/* Left Column */}
                    <Box>
                        <Image
                            src={selectedBook.image}
                            alt={selectedBook.title}
                            maxH="300px"
                        />
                    </Box>
                </VStack>

                {/* Right Column */}
                <VStack w="60%" align="start" spacing={4}>
                    <Heading size="lg">{selectedBook.title}</Heading>
                    <HStack spacing={4}>
                        <VStack align="start">
                            <Text fontWeight="bold">Autor:</Text>
                            {/* Author Value */}
                            <Text>{selectedBook.author}</Text>
                        </VStack>
                        <VStack align="start">
                            <Text fontWeight="bold">Vendedor:</Text>
                            {/* Vendor Value */}
                            <Text>{selectedBook.author}</Text>
                        </VStack>
                        {/* Vendor Label */}
                    </HStack>

                    {/* Description */}
                    <Text fontWeight="bold">Descripcion:</Text>
                    <Text>{selectedBook.description}</Text>

                    {/* Price Label */}
                    <Text fontWeight="bold">Precio:</Text>
                    {/* Price Value */}
                    <Text color="blue.400" fontSize="2xl">
                        {`L. ${selectedBook.price}`}
                    </Text>
                    {/* Add to Cart Section */}
                    <Box w="100%">
                        <HStack>
                            <Button
                                colorScheme="blue"
                                leftIcon={
                                    <FontAwesomeIcon icon={faCartShopping} />
                                }
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>

                            {/* Quantity Selector */}
                            <Spacer />
                            <NumberInput
                                defaultValue={quantity}
                                min={1}
                                onChange={(valueString) =>
                                    setQuantity(parseInt(valueString))
                                }
                                w="80px"
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </HStack>
                    </Box>
                </VStack>
            </Flex>
        </VStack>
    );
};

export default BookPage;
