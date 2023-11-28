import React, { useEffect, useState } from 'react';
import {
    Flex,
    Box,
    Spacer,
    Link as ChakraLink,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Image,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import LoginPage from '../containers/LoginPage';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { googleLogout } from '@react-oauth/google';
import { logoutUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../store/hooks';

const NavBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loggedUser } = useSelector((state: RootState) => state.user);

    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const openLoginModal = () => {
        setLoginModalOpen(true);
    };

    const closeModal = () => {
        setLoginModalOpen(false);
    };

    const logoutUserSession = () => {
        googleLogout();
        dispatch(logoutUser());
        window.location.reload();
    };

    useEffect(() => {
        if (loggedUser) {
            setLoginModalOpen(false);
        }
    }, [loggedUser]);

    return (
        <Flex p={4} bg="teal.500" color="white">
            <Box>
                <ChakraLink as={Link} to="/">
                    Home
                </ChakraLink>
            </Box>
            <Spacer />
            {loggedUser ? (
                <Link to="/dashboard">
                    <Button colorScheme="teal" mr={4}>
                        Dashboard
                    </Button>
                </Link>
            ) : null}
            <Box>
                {!loggedUser ? (
                    <Button colorScheme="teal" onClick={openLoginModal} mr={4}>
                        Login
                    </Button>
                ) : (
                    <Box display="flex">
                        <Image
                            borderRadius="full"
                            boxSize="35px"
                            src={loggedUser.picture}
                            alt={loggedUser.name}
                        />
                        <Button
                            colorScheme="teal"
                            onClick={logoutUserSession}
                            mr={4}
                        >
                            Logout
                        </Button>
                    </Box>
                )}
            </Box>

            <Modal isOpen={isLoginModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <LoginPage />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default NavBar;
