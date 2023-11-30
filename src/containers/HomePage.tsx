import React from 'react';
import ProductsPage from '../containers/ProductsPage';
import { VStack } from '@chakra-ui/react';

const HomePage: React.FC = () => {
    return (
        <VStack marginTop="20px">
            <ProductsPage />
        </VStack>
    );
};

export default HomePage;
