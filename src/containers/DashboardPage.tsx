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
    useToast,
    useColorMode,
} from '@chakra-ui/react';
import UploadBook from '../components/UploadBook';
import { fetchBooksByUser, setSuccessMessage } from '../store/slices/bookSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import UserBookCard from '../components/UserBookCard';

const DashboardPage: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();
    const toast = useToast();

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
            toast({
                title: 'Success',
                description: successMessage,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        }

        setUploadModalOpen(false);
        dispatch(setSuccessMessage({ message: null }));
    }, [successMessage, dispatch, toast]);

    if (!loggedUser) {
        return (
            <Alert status="error">
                <AlertIcon />
                You must be logged in to access this page.
            </Alert>
        );
    }

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
                <Button size="sm" onClick={openUploadModal} colorScheme="blue">
                    Upload
                </Button>
            </VStack>
            <VStack spacing={2} align="center">
                <Box>
                    {loading && (
                        <Spinner
                            p={4}
                            size="xl"
                            thickness="4px"
                            color="blue.800"
                            mb="4"
                        />
                    )}
                    {error && <p>Error: {error}</p>}
                </Box>
                <SimpleGrid
                    columns={3}
                    spacing={5}
                    overflowY="scroll"
                    maxHeight="80vh"
                >
                    {books.map((book) => {
                        return (
                            <Box key={book.id}>
                                <UserBookCard
                                    userId={loggedUser.id}
                                    book={book}
                                />
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
        </div>
    );
};

export default DashboardPage;
