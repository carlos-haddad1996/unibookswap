import { Button, VStack, Text, Image, Box } from '@chakra-ui/react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { loginWithGoogle } from '../store/slices/userSlice';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();

    return (
        <VStack spacing={2} align="center" height="50vh">
            <Image
                src="https://storage.googleapis.com/unibookswap-bucket/complete-logo.png"
                alt="logo"
                width={180}
                height={100}
            />
            <Text>Bienvenido</Text>
            <Text>{'Inicia sesión o registrate sin costo a  UniBookSwap'}</Text>
            <Box p={4}>
                <Button mt={2}>
                    <GoogleLogin
                        onSuccess={async (response) =>
                            dispatch(loginWithGoogle(response))
                        }
                        onError={() => console.log('login failed')}
                        theme="filled_blue"
                        shape="pill"
                    />
                </Button>
            </Box>
        </VStack>
    );
};

export default LoginPage;
