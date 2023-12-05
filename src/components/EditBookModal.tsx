import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Book, BookUpdate } from '../store/interfaces/book';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    ModalFooter,
    Button,
    Text,
    Textarea,
    InputGroup,
    InputRightElement,
    Tooltip,
} from '@chakra-ui/react';
import { updateBook } from '../store/slices/bookSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../store/rootReducer';

interface EditBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    book: Book;
}

const EditBookModal: React.FC<EditBookModalProps> = ({
    isOpen,
    onClose,
    userId,
    book,
}) => {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();
    const [editedBook, setEditedBook] = useState<Book>({ ...book });

    const handleSaveChanges = () => {
        const updatedBook: BookUpdate = {
            title: editedBook.title,
            author: editedBook.author,
            description: editedBook.description,
            price: editedBook.price,
            category: editedBook.category,
            image: editedBook.image,
        };

        dispatch(updateBook({ userId, bookId: book.id, updatedBook }));
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar Libro</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Titulo:</Text>
                    <Tooltip label="Titulo no puede ser editado">
                        <Input value={editedBook.title} disabled />
                    </Tooltip>

                    <Text>Autor:</Text>
                    <Tooltip label="Autor no puede ser editado">
                        <Input value={editedBook.author} disabled />
                    </Tooltip>

                    <Text>Descripcion</Text>
                    <Textarea
                        value={editedBook.description}
                        onChange={(e) =>
                            setEditedBook({
                                ...editedBook,
                                description: e.target.value,
                            })
                        }
                    />

                    <Text>Categoria</Text>
                    <Input
                        value={editedBook.category}
                        onChange={(e) =>
                            setEditedBook({
                                ...editedBook,
                                category: e.target.value,
                            })
                        }
                    />

                    <Text>Precio:</Text>
                    <Input
                        value={editedBook.price}
                        onChange={(e) =>
                            setEditedBook({
                                ...editedBook,
                                price: e.target.value,
                            })
                        }
                    />
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditBookModal;
