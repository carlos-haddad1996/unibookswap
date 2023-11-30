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
} from '@chakra-ui/react';

interface BookCardProps {
    book: Book;
}

const ProductCard: React.FC<BookCardProps> = ({ book }) => {
    return (
        <Card maxW="sm">
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
                    <Text>{book.description}</Text>
                    <Text color="blue.600" fontSize="2xl">
                        {`L. ${book.price}`}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue">
                        Add To Cart
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
