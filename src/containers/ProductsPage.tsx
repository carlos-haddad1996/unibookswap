import React, { useEffect, useState } from 'react';
import {
    Box,
    Text,
    SimpleGrid,
    VStack,
    Input,
    Flex,
    Spinner,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/rootReducer';
import { ThunkDispatch } from '@reduxjs/toolkit';
import {
    fetchAuthors,
    fetchBooks,
    fetchCategories,
} from '../store/slices/bookSlice';
import ProductCard from '../components/ProductCard';
import FilterSection from '../components/FilterSection';

const ProductsPage: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();

    const { books, loading, authors, error, categories } = useSelector(
        (state: RootState) => state.books
    );

    const [filterText, setFilterText] = useState<string>('');
    // const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedAuthor, setSelectedAuthor] = useState<string[]>([]);

    const filterBooks = () => {
        return books.filter((book) => {
            const authorFilters =
                selectedAuthor.length === 0 ||
                selectedAuthor.includes(book.author);
            const categoryFilters =
                selectedCategory.length === 0 ||
                selectedCategory.includes(book.category);

            const searchFilter =
                filterText === '' ||
                book.title.toLowerCase().includes(filterText.toLowerCase()) ||
                book.author.toLowerCase().includes(filterText.toLowerCase()) ||
                book.category
                    .toLowerCase()
                    .includes(filterText.toLowerCase()) ||
                book.description
                    .toLowerCase()
                    .includes(filterText.toLowerCase());

            return authorFilters && categoryFilters && searchFilter;
        });
    };

    const handleAuthorChange = (author: string) => {
        setSelectedAuthor((prevAuthors) =>
            prevAuthors.includes(author)
                ? prevAuthors.filter((a) => a !== author)
                : [...prevAuthors, author]
        );
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory((prevCategories) =>
            prevCategories.includes(category)
                ? prevCategories.filter((c) => c !== category)
                : [...prevCategories, category]
        );
    };

    const filteredBooks = filterBooks();

    useEffect(() => {
        dispatch(fetchBooks());
        dispatch(fetchAuthors());
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <Flex>
            <VStack spacing={2} align="center" mr={10}>
                <FilterSection
                    authors={authors}
                    categories={categories}
                    selectedAuthor={selectedAuthor}
                    selectedCategory={selectedCategory}
                    handleAuthorChange={handleAuthorChange}
                    handleCategoryChange={handleCategoryChange}
                />
            </VStack>
            <VStack spacing={2} align="center">
                <Input
                    placeholder="Search Product"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    mb={4}
                    focusBorderColor="purple.500"
                    borderWidth={2}
                    borderRadius="md"
                    size="lg"
                    width="50%"
                />
                <Box>
                    {loading && (
                        <Spinner
                            size="xl"
                            thickness="4px"
                            color="teal.500"
                            mb="4"
                        />
                    )}
                    {error && <p>Error: {error}</p>}
                </Box>
                <Box overflowY="scroll" maxHeight="80vh" width="100%">
                    {filteredBooks.length === 0 ? (
                        <Text>No Books Found</Text>
                    ) : (
                        <SimpleGrid columns={3} spacing={5}>
                            {filteredBooks.map((book) => (
                                <Box key={book.id}>
                                    <ProductCard book={book} />
                                </Box>
                            ))}
                        </SimpleGrid>
                    )}
                </Box>
            </VStack>
        </Flex>
    );
};

export default ProductsPage;
