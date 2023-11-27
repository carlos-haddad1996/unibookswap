import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import LoginPage from '../containers/LoginPage';

const NavBar: React.FC = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const openLoginModal = () => {
        setLoginModalOpen(true);
    };

    const closeModal = () => {
        setLoginModalOpen(false);
    };

    return (
        <Flex p={4} bg="teal.500" color="white">
            <Box>
                <ChakraLink as={Link} to="/">
                    Home
                </ChakraLink>
            </Box>
            <Spacer />
            <Box>
                <Button colorScheme="teal" onClick={openLoginModal} mr={4}>
                    Login
                </Button>
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
