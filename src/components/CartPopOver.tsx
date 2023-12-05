import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    List,
    ListItem,
    Button,
    Text,
    VStack,
    HStack,
    Box,
    Spacer,
    Image,
    PopoverFooter,
    useToast,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faX } from '@fortawesome/free-solid-svg-icons';
import { removeFromCart } from '../store/slices/cartSlice';
import { Book } from '../store/interfaces/book';
import { selectCartTotalPrice } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPopOver: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const loggedUser = useSelector((state: RootState) => state.user.loggedUser);
    const items = useSelector((state: RootState) => state.cart.items);
    const totalPrice = useSelector(selectCartTotalPrice);

    const removeItem = (book: Book) => {
        dispatch(removeFromCart(book));
    };

    const handleCheckout = () => {
        if (!loggedUser) {
            toast({
                title: 'Error',
                description: 'Please login to checkout.',
                status: 'error',
                duration: 1500,
                isClosable: true,
            });
            return;
        }

        navigate(`/checkout/${loggedUser.id}`);
    };

    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    colorScheme="blue"
                    leftIcon={<FontAwesomeIcon icon={faCartShopping} />}
                />
            </PopoverTrigger>
            <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
                <PopoverHeader fontWeight="semibold" border="0">
                    Cart
                </PopoverHeader>
                <PopoverArrow bg="blue.800" />
                <PopoverCloseButton />
                <PopoverBody>
                    {!items.length && <Text>No items in cart.</Text>}
                    <List>
                        {items.map((item) => (
                            <ListItem key={item.book.id}>
                                <HStack
                                    pt={2}
                                    display="flex"
                                    justify="flex-start"
                                    alignItems="center"
                                >
                                    <HStack>
                                        <Image
                                            boxSize="50px"
                                            src={item.book.image}
                                        />
                                        <Text>{item.book.title}</Text>
                                    </HStack>
                                    <Spacer />
                                    <Box pb={10}>
                                        <Button
                                            background={'red.500'}
                                            colorScheme="red"
                                            height="20px"
                                            alignContent="center"
                                            onClick={() =>
                                                removeItem(item.book)
                                            }
                                            leftIcon={
                                                <FontAwesomeIcon icon={faX} />
                                            }
                                        />
                                    </Box>
                                </HStack>
                            </ListItem>
                        ))}
                    </List>
                </PopoverBody>
                {items.length ? (
                    <PopoverFooter
                        border="0"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        pb={4}
                    >
                        <Button onClick={handleCheckout} colorScheme="blue">
                            Checkout
                        </Button>
                        <Spacer />
                        <Text>Total: L.{totalPrice}</Text>
                    </PopoverFooter>
                ) : null}
            </PopoverContent>
        </Popover>
    );
};

export default CartPopOver;
