import React from 'react';
import {
    Accordion,
    AccordionButton,
    AccordionPanel,
    Card,
    CheckboxGroup,
    Checkbox,
    AccordionItem,
    VStack,
    Box,
} from '@chakra-ui/react';

interface FilterCheckboxesProps {
    filterName: string;
    filterValue: string[];
    selectedAuthor: string[];
    selectedCategory: string[];
    handleAuthorChange: (author: string) => void;
    handleCategoryChange: (category: string) => void;
}

const FilterCheckboxes: React.FC<FilterCheckboxesProps> = ({
    filterName,
    filterValue,
    selectedAuthor,
    selectedCategory,
    handleAuthorChange,
    handleCategoryChange,
}) => {
    return (
        <Card width="180px">
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            Filter By {filterName}
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        <CheckboxGroup colorScheme="blue" defaultValue={[]}>
                            <VStack
                                direction={'column'}
                                spacing={2}
                                alignItems="flex-start"
                            >
                                {filterValue.map((value: string) => {
                                    return (
                                        <Box key={value.toLowerCase()}>
                                            <Checkbox
                                                onChange={
                                                    filterName === 'Authors'
                                                        ? () =>
                                                              handleAuthorChange(
                                                                  value
                                                              )
                                                        : () =>
                                                              handleCategoryChange(
                                                                  value
                                                              )
                                                }
                                                isChecked={
                                                    filterName === 'Authors'
                                                        ? selectedAuthor.includes(
                                                              value
                                                          )
                                                        : selectedCategory.includes(
                                                              value
                                                          )
                                                }
                                                value={value.toLowerCase()}
                                            >
                                                {value}
                                            </Checkbox>
                                        </Box>
                                    );
                                })}
                            </VStack>
                        </CheckboxGroup>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Card>
    );
};

export default FilterCheckboxes;
