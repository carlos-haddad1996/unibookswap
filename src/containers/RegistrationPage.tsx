import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/');
    };

    return (
        <VStack spacing={4} align="center" justify="center" height="100vh">
            <Box borderWidth="1px" borderRadius="lg" p={8} width="400px">
                <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl id="email" mt={4} isRequired>
                    <FormLabel>Email address</FormLabel>
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
                <Button colorScheme="blue" mt={4} onClick={handleRegister}>
                    Register
                </Button>
            </Box>
        </VStack>
    );
};

export default RegistrationPage;
