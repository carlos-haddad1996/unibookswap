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
    InputGroup,
    Input,
    InputLeftElement,
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
import { SearchIcon } from '@chakra-ui/icons';
import NavBarSearchPopOver from './NavBarSearchPopOver';

const NavBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { colorMode, toggleColorMode } = useColorMode();
    const { loggedUser } = useSelector((state: RootState) => state.user);

    const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);

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
        <Flex p={4} color="white" boxShadow="lg" height="90px">
            <HStack spacing={4}>
                <Box>
                    <Image
                        src="https://storage.googleapis.com/unibookswap-bucket/complete-logo.png"
                        alt="logo"
                        width={150}
                        height={75}
                    />
                </Box>
                <Box>
                    <Link to={'/'}>
                        <Button colorScheme="blue" mr={4}>
                            Inicio
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
                {!loggedUser?.activeSub ? (
                    <Link to={'/pricing'}>
                        <Button colorScheme="blue" mr={4}>
                            Planes de suscripción
                        </Button>
                    </Link>
                ) : null}
            </HStack>
            <Spacer />
            <HStack>
                {/* <Box>
                    <NavBarSearchPopOver />
                </Box> */}
                <Box>
                    {!loggedUser ? (
                        <Button
                            colorScheme="blue"
                            onClick={openLoginModal}
                            mr={4}
                        >
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
            </HStack>

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
