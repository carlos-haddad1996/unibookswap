import { Button, VStack, Text } from '@chakra-ui/react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { loginWithGoogle } from '../store/slices/userSlice';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();

    return (
        <VStack spacing={2} align="center" justify="center" height="50vh">
            <Text>Bienvenido</Text>
            <Text>{'Inicia sesión en UniBookSwap'}</Text>
            <Button mt={2}>
                <GoogleLogin
                    onSuccess={async (response) =>
                        dispatch(loginWithGoogle(response))
                    }
                    onError={() => console.log('login failed')}
                />
            </Button>
        </VStack>
    );
};

export default LoginPage;
