import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import {
    Box,
    Heading,
    VStack,
    Text,
    Image,
    Button,
    SimpleGrid,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Alert,
    AlertIcon,
    Spinner,
} from '@chakra-ui/react';
import UploadBook from '../components/UploadBook';
import { fetchBooksByUser, setSuccessMessage } from '../store/slices/bookSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import UserBookCard from '../components/UserBookCard';

const DashboardPage: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();

    const { loggedUser } = useSelector((state: RootState) => state.user);
    const { books, loading, error } = useSelector(
        (state: RootState) => state.books
    );

    const successMessage = useSelector(
        (state: RootState) => state.books.successMessage
    );

    const [isUploadModalOpen, setUploadModalOpen] = useState<boolean>(false);

    const openUploadModal = () => {
        setUploadModalOpen(true);
    };

    const closeModal = () => {
        setUploadModalOpen(false);
    };

    useEffect(() => {
        if (loggedUser) dispatch(fetchBooksByUser(loggedUser.id));
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            setUploadModalOpen(false);
            const timeoutId = setTimeout(() => {
                dispatch(setSuccessMessage({ message: null }));
            }, 10000);
            return () => clearTimeout(timeoutId);
        }
    }, [successMessage, dispatch]);

    return (
        <div>
            <VStack>
                <Box p={8} display="flex">
                    {loggedUser?.picture && (
                        <Image
                            borderRadius="full"
                            boxSize="90px"
                            src={loggedUser.picture}
                            alt={loggedUser.name}
                        />
                    )}
                </Box>
                <Box>
                    <Heading mb={4}>Bienvenido, {loggedUser?.name}</Heading>
                </Box>
            </VStack>
            <VStack spacing={4} align="center">
                <Text>Book Management</Text>
                <Button size="sm" onClick={openUploadModal} colorScheme="teal">
                    Upload
                </Button>
            </VStack>
            <VStack spacing={2} align="center">
                <Box>
                    {loading && (
                        <Spinner
                            size="xl"
                            thickness="4px"
                            color="teal.500"
                            mb="4"
                        />
                    )}
                    {error && <p>Error: {error}</p>}
                </Box>
                <SimpleGrid columns={3} spacing={5}>
                    {books.map((book) => {
                        return (
                            <Box key={book.id}>
                                <UserBookCard book={book} />
                            </Box>
                        );
                    })}
                </SimpleGrid>
            </VStack>
            <Modal isOpen={isUploadModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Libro a Subir</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <UploadBook />
                    </ModalBody>
                </ModalContent>
            </Modal>

            {successMessage && (
                <Alert status="success" mb={4}>
                    <AlertIcon />
                    {successMessage}
                </Alert>
            )}
        </div>
    );
};

export default DashboardPage;