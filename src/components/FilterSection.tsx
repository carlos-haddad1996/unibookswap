import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import FilterCheckboxes from './filterComponents/FilterCheckboxes';

interface FilterSectionProps {
    authors: string[];
    categories: string[];
    selectedAuthor: string[];
    selectedCategory: string[];
    handleAuthorChange: (author: string) => void;
    handleCategoryChange: (category: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
    authors,
    categories,
    selectedAuthor,
    selectedCategory,
    handleAuthorChange,
    handleCategoryChange,
}) => {
    return (
        <div>
            <Heading>Filter Option</Heading>
            <VStack spacing={2}>
                <FilterCheckboxes
                    filterName="Authors"
                    filterValue={authors}
                    selectedAuthor={selectedAuthor}
                    selectedCategory={selectedCategory}
                    handleAuthorChange={handleAuthorChange}
                    handleCategoryChange={handleCategoryChange}
                />
                <FilterCheckboxes
                    filterName="Categories"
                    filterValue={categories}
                    selectedAuthor={selectedAuthor}
                    selectedCategory={selectedCategory}
                    handleAuthorChange={handleAuthorChange}
                    handleCategoryChange={handleCategoryChange}
                />
            </VStack>
        </div>
    );
};

export default FilterSection;
