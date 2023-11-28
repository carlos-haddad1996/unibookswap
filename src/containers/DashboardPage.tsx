import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';

const DashboardPage: React.FC = () => {
    const { loggedUser } = useSelector((state: RootState) => state.user);

    return (
        <div>
            <Box p={8}>
                <Heading mb={4}>Bienvenido, {loggedUser?.name}</Heading>
                {loggedUser?.picture && (
                    <img src={loggedUser.picture} alt="User Profile" />
                )}
                <VStack spacing={4} align="start">
                    <Text>This is your Dashboard page.</Text>
                    {/* Add more content or features relevant to the dashboard */}
                </VStack>
            </Box>
        </div>
    );
};

export default DashboardPage;
