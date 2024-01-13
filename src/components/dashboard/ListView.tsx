import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { Book } from '../../store/interfaces/book';
import { User } from '../../store/interfaces/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditBookModal from '../EditBookModal';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import TableBooks from './TableBooks';

interface ListViewProps {
    user: User;
    books: Book[];
}

const ListView: React.FC<ListViewProps> = ({ user, books }) => {
    return (
        <div>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Author</Th>
                        <Th>Category</Th>
                        <Th>Price</Th>
                        <Th>Edit</Th>
                        <Th>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {books.map((book) => (
                        <TableBooks user={user} book={book} />
                    ))}
                </Tbody>
            </Table>
        </div>
    );
};

export default ListView;
