import React from 'react';
import { Tr, Td, Button } from '@chakra-ui/react';
import { User } from '../../store/interfaces/user';
import { Book } from '../../store/interfaces/book';
import EditBookModal from '../EditBookModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import DeleteBookPopOver from '../DeleteBookPopOver';

interface TableBooksProps {
    user: User;
    book: Book;
}

const TableBooks: React.FC<TableBooksProps> = ({ user, book }) => {
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    const handleEditModalOpen = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <>
            <Tr key={book.id}>
                <Td>{book.title}</Td>
                <Td>{book.author}</Td>
                <Td>{book.category}</Td>
                <Td>L. {book.price}</Td>
                <Td>
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                        variant="solid"
                        colorScheme="blue"
                        onClick={() => handleEditModalOpen()}
                    >
                        Editar Libro
                    </Button>
                </Td>
                <Td>
                    <DeleteBookPopOver userId={user.id} book={book} />
                </Td>
            </Tr>
            <EditBookModal
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
                userId={user.id}
                book={book}
            />
        </>
    );
};

export default TableBooks;
