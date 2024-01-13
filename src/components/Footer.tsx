import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
    return (
        <Box as="footer" textAlign="center" p={10}>
            <Text fontSize="sm" colorScheme="black">
                &copy; {new Date().getFullYear()} UniBookSwap.
            </Text>
        </Box>
    );
};

export default Footer;
