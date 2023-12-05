import {
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    PopoverFooter,
    ButtonGroup,
    useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { Book } from '../store/interfaces/book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../store/rootReducer';
import { deleteBook } from '../store/slices/bookSlice';

interface DeleteBookPopOverProps {
    userId: string;
    book: Book;
}

const DeleteBookPopOver: React.FC<DeleteBookPopOverProps> = ({
    userId,
    book,
}) => {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteBook = () => {
        dispatch(deleteBook({ userId, bookId: book.id }));
        onClose();
    };

    return (
        <Popover
            isOpen={isOpen}
            placement="bottom"
            closeOnBlur={false}
            onOpen={onOpen}
            onClose={onClose}
        >
            <PopoverTrigger>
                <Button
                    leftIcon={<FontAwesomeIcon icon={faTrash} />}
                    colorScheme="red"
                >
                    Borrar Libro
                </Button>
            </PopoverTrigger>
            <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
                <PopoverHeader pt={4} fontWeight="bold" border="0">
                    Borrar Libro
                </PopoverHeader>
                <PopoverArrow bg="blue.800" />
                <PopoverCloseButton />
                <PopoverBody>
                    {`Estás seguro que quieres borrar el libro ${book.title}?`}
                </PopoverBody>
                <PopoverFooter
                    border="0"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    pb={4}
                >
                    <ButtonGroup size="sm">
                        <Button colorScheme="red" onClick={handleDeleteBook}>
                            Si
                        </Button>
                        <Button colorScheme="blue" onClick={onClose}>
                            No
                        </Button>
                    </ButtonGroup>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

export default DeleteBookPopOver;
