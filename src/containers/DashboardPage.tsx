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
    HStack,
    Switch,
    Spacer,
} from '@chakra-ui/react';
import UploadBook from '../components/UploadBook';
import { fetchBooksByUser, setSuccessMessage } from '../store/slices/bookSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import UserBookCard from '../components/UserBookCard';
import { fetchUsers } from '../store/slices/userSlice';
import { GridView, ListView } from '../components/dashboard';

const DashboardPage: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();
    const toast = useToast();

    const { loggedUser } = useSelector((state: RootState) => state.user);
    const { booksByUser, loading, error } = useSelector(
        (state: RootState) => state.books
    );

    const successMessage = useSelector(
        (state: RootState) => state.books.successMessage
    );

    const [isUploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
    const [isListView, setIsListView] = useState<boolean>(false);

    const openUploadModal = () => {
        setUploadModalOpen(true);
    };

    const closeModal = () => {
        setUploadModalOpen(false);
    };

    const handleToogleView = () => {
        setIsListView(!isListView);
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

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

    if (!loggedUser.activeSub) {
        return (
            <Box>
                <Alert status="error">
                    <AlertIcon />
                    {`Necesitas una suscripción activa para acceder a esta página.`}
                </Alert>
                <Text
                    p={4}
                >{`Ve a la sección de precios para ver los planes que tenemos disponibles.`}</Text>
            </Box>
        );
    }

    return (
        <div style={{ marginBottom: '100px' }}>
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
                <HStack>
                    <Button
                        size="sm"
                        onClick={openUploadModal}
                        colorScheme="blue"
                    >
                        Subir Libro
                    </Button>
                    <Spacer />
                    <VStack>
                        <Text>Lista</Text>
                        <Switch
                            isChecked={isListView}
                            onChange={handleToogleView}
                        />
                    </VStack>
                </HStack>
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
                {booksByUser.length === 0 && (
                    <Box>
                        <Text>{`Todavía no tienes libros en inventario.`}</Text>
                        <Text>{`Haz click en 'Subir Libro' para comenzar a publicar.`}</Text>
                    </Box>
                )}
                {isListView ? (
                    <ListView user={loggedUser} books={booksByUser} />
                ) : (
                    <GridView user={loggedUser} books={booksByUser} />
                )}
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
