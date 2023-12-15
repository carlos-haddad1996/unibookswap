import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

import React from 'react';

const NotFoundPage: React.FC = () => {
    return (
        <VStack align="center">
            <Box>
                <HStack>
                    <WarningIcon boxSize="80px" color="red.500" />
                    <VStack align="start">
                        <Heading>404 - Page Not Found</Heading>
                        <Text>
                            The page you are looking for does not exist.
                        </Text>
                    </VStack>
                </HStack>
            </Box>
        </VStack>
    );
};

export default NotFoundPage;
