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
    HStack,
    useColorMode,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import LoginPage from '../containers/LoginPage';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { googleLogout } from '@react-oauth/google';
import { logoutUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../store/hooks';
import CartPopOver from './CartPopOver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const NavBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { colorMode, toggleColorMode } = useColorMode();
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
        <Flex p={4} color="white" boxShadow="lg">
            <Box>
                <Link to={'/'}>
                    <Button colorScheme="blue" mr={4}>
                        Home
                    </Button>
                </Link>
            </Box>
            {loggedUser ? (
                <Link to={`/dashboard/${loggedUser.id}`}>
                    <Button colorScheme="blue" mr={4}>
                        Dashboard
                    </Button>
                </Link>
            ) : null}
            <Spacer />
            <Box>
                {!loggedUser ? (
                    <Button colorScheme="blue" onClick={openLoginModal} mr={4}>
                        Login
                    </Button>
                ) : (
                    <Box display="flex" alignItems="center">
                        <Box mr="5">
                            <Image
                                borderRadius="full"
                                boxSize="35px"
                                src={loggedUser.picture}
                                alt={loggedUser.name}
                            />
                        </Box>
                        <Box>
                            <Button
                                colorScheme="blue"
                                onClick={logoutUserSession}
                                mr={4}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
            <Box>
                <CartPopOver />
            </Box>
            <Box pl={2}>
                <Button
                    colorScheme="blue"
                    onClick={toggleColorMode}
                    leftIcon={<FontAwesomeIcon icon={faLightbulb} />}
                />
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
