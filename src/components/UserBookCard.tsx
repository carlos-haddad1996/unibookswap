import { useState } from 'react';
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
import EditBookModal from './EditBookModal';
import DeleteBookPopOver from './DeleteBookPopOver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

interface BookCardProps {
    userId: string;
    book: Book;
}

const UserBookCard: React.FC<BookCardProps> = ({ userId, book }) => {
    const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);

    const handleEditModalOpen = () => {
        setEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
    };

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
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                        variant="solid"
                        colorScheme="blue"
                        onClick={() => handleEditModalOpen()}
                    >
                        Editar Libro
                    </Button>
                    <DeleteBookPopOver userId={userId} book={book} />
                </ButtonGroup>
            </CardFooter>

            <EditBookModal
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
                userId={userId}
                book={book}
            />
        </Card>
    );
};

export default UserBookCard;
