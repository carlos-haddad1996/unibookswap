import React from 'react';
import { Book } from '../../store/interfaces/book';
import { Box, SimpleGrid } from '@chakra-ui/react';
import UserBookCard from '../UserBookCard';
import { User } from '../../store/interfaces/user';

interface GridViewProps {
    user: User;
    books: Book[];
}

const GridView: React.FC<GridViewProps> = ({ user, books }) => {
    return (
        <div>
            <SimpleGrid columns={3} spacing={5}>
                {books.map((book) => (
                    <Box key={book.id}>
                        <UserBookCard userId={user.id} book={book} />
                    </Box>
                ))}
            </SimpleGrid>
        </div>
    );
};

export default GridView;
