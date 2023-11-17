import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    VStack,
    Text,
} from '@chakra-ui/react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/rootReducer';
import { loginUser } from '../store/slices/userSlice';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();

    const { loading, error } = useSelector((state: RootState) => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        dispatch(loginUser({ email, password }));
    };

    const handleRegister = () => {
        navigate('/registrationPage');
    };

    return (
        <VStack spacing={4} align="center" justify="center" height="100vh">
            <Box borderWidth="1px" borderRadius="lg" p={8} width="400px">
                <FormControl id="email" isRequired>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl id="password" mt={4} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Grid templateColumns="repeat(1, 1fr)" gap={2}>
                    <GridItem w="100%">
                        <Button colorScheme="teal" mt={4} onClick={handleLogin}>
                            Login
                        </Button>
                    </GridItem>
                    <GridItem w="100%">
                        <Button
                            colorScheme="teal"
                            mt={4}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </GridItem>
                    {error && <Text color="red.500">{error}</Text>}
                </Grid>
            </Box>
        </VStack>
    );
};

export default LoginPage;
