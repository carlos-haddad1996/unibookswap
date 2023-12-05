import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Book } from '../store/interfaces/book';
import {
    Box,
    Image,
    Card,
    CardBody,
    Stack,
    Heading,
    Text,
    Divider,
    ButtonGroup,
    Button,
    CardFooter,
    NumberInput,
    NumberInputStepper,
    NumberDecrementStepper,
    NumberInputField,
    Spacer,
    NumberIncrementStepper,
    useToast,
    StatNumber,
    Stat,
    StatLabel,
} from '@chakra-ui/react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

interface BookCardProps {
    book: Book;
}

const ProductCard: React.FC<BookCardProps> = ({ book }) => {
    const dispatch = useDispatch();
    const toast = useToast();
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
        if (book) {
            dispatch(addToCart({ book, quantity }));
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
        <Card maxW="sm">
            <Link to={`/books/${book.id}`}>
                <CardBody>
                    <Box display="flex" justifyContent="center">
                        <Image
                            height="150px"
                            src={book.image}
                            alt={book.title}
                            borderRadius="md"
                        />
                    </Box>
                    <Stack mt={6} spacing={3}>
                        <Heading size="md">{book.title}</Heading>
                        {/* <Text>{book.description}</Text> */}
                        <Stat>
                            <StatLabel>Precio</StatLabel>
                            <StatNumber color="blue.600" fontSize="2xl">
                                {`L. ${book.price}`}
                            </StatNumber>
                        </Stat>
                    </Stack>
                </CardBody>
            </Link>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing="2">
                    <Button
                        variant="solid"
                        colorScheme="blue"
                        leftIcon={<FontAwesomeIcon icon={faCartShopping} />}
                        onClick={handleAddToCart}
                    >
                        Add To Cart
                    </Button>
                    <Spacer />
                    <NumberInput
                        defaultValue={quantity}
                        min={1}
                        onChange={(valueString) =>
                            setQuantity(parseInt(valueString))
                        }
                        width="80px"
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
