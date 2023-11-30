import React from 'react';
import { Book } from '../store/interfaces/book';
import { useParams } from 'react-router-dom';
import { VStack, Heading, Button, Box, Image, Text } from '@chakra-ui/react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface BookPageProps {
    books: Book[];
}

const BookPage: React.FC<BookPageProps> = ({ books }) => {
    console.log(books);

    const { bookId } = useParams<{ bookId: string }>();

    const selectedBook = books.find((book) => book.id === Number(bookId));

    console.log({ bookId, selectedBook });

    const handleAddToCart = () => {
        console.log('Add to cart');
    };

    if (!selectedBook) {
        return <div>Book not found.</div>;
    }

    return (
        <VStack spacing={4} align="start">
            <Heading size="lg">{selectedBook.title}</Heading>

            <Box>
                <Image
                    src={selectedBook.image}
                    alt={selectedBook.title}
                    maxH="300px"
                />
            </Box>

            <Text>{selectedBook.author}</Text>
            <Text>{selectedBook.description}</Text>

            <Button
                colorScheme="teal"
                leftIcon={<FontAwesomeIcon icon={faCartShopping} />}
                onClick={handleAddToCart}
            >
                Add to Cart
            </Button>
        </VStack>
    );
};

export default BookPage;
