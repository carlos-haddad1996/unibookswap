import React, { useEffect, useState } from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    List,
    ListItem,
    Button,
    Text,
    VStack,
    HStack,
    Box,
    Spacer,
    Image,
    PopoverFooter,
    useToast,
    Input,
    InputGroup,
    InputLeftElement,
    useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Book } from '../store/interfaces/book';

const NavBarSearchPopOver: React.FC = () => {
    const [filterText, setFilterText] = useState<string>('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { books } = useSelector((state: RootState) => state.books);

    const filterBooks = () => {
        return books.filter((book) => {
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
            onOpen();

            return searchFilter;
        });
    };

    useEffect(() => {
        if (filterText) {
            filterBooks();
            onOpen();
        } else {
            onClose();
        }
    }, [filterText, onOpen, onClose]);

    const filteredBooks = filterBooks();

    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
                <InputGroup>
                    <InputLeftElement pointerEvents="none" mt={1}>
                        <SearchIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                        placeholder="Search"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        focusBorderColor="blue.500"
                        borderWidth={2}
                        borderRadius="100px"
                        size="lg"
                        backgroundColor="white"
                        color="black"
                        width="100%"
                        onBlur={filterBooks}
                    />
                </InputGroup>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Resultados</PopoverHeader>
                <PopoverBody>
                    {filteredBooks.length === 0 ? (
                        <Text>No hay resultados</Text>
                    ) : (
                        <List>
                            {filteredBooks.map((book) => (
                                <ListItem key={book.id}>
                                    <Text>{book.title}</Text>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default NavBarSearchPopOver;
