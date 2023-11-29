import { useSelector, useDispatch } from 'react-redux';
import { addBook } from '../store/slices/bookSlice';
import {
    Input,
    Textarea,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    InputGroup,
    InputRightElement,
    Box,
    Heading,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RootState } from '../store/rootReducer';
import { BookUpload } from '../store/interfaces/book';
import { ThunkDispatch } from '@reduxjs/toolkit';

const UploadBook: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();

    const { loggedUser } = useSelector((state: RootState) => state.user);

    const [bookTitle, setBookTitle] = useState<string>('');
    const [bookDescription, setBookDescription] = useState<string>('');
    const [bookAuthor, setBookAuthor] = useState<string>('');
    const [bookPrice, setBookPrice] = useState<string>('');
    const [bookCategory, setBookCategory] = useState<string>('');
    const [bookFile, setBookFile] = useState<File | null>(null);

    const handleUpload = () => {
        if (!bookTitle || !bookDescription || !bookFile) {
            alert('Favor ingresa todos los valores requeridos');
            return;
        }

        const newBook: BookUpload = {
            title: bookTitle,
            author: bookAuthor,
            price: bookPrice,
            description: bookDescription,
            category: bookCategory,
            image: bookFile,
        };

        if (loggedUser) dispatch(addBook({ userId: loggedUser.id, newBook }));
    };

    return (
        <Box p={4}>
            <Heading>Subir Libro</Heading>
            <form>
                <FormControl mb={4}>
                    <FormLabel>Titulo</FormLabel>
                    <Input
                        type="text"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Autor</FormLabel>
                    <Input
                        type="text"
                        value={bookAuthor}
                        onChange={(e) => setBookAuthor(e.target.value)}
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Precio</FormLabel>
                    <Input
                        type="text"
                        value={bookPrice}
                        onChange={(e) => setBookPrice(e.target.value)}
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Categoria</FormLabel>
                    <Input
                        type="text"
                        value={bookCategory}
                        onChange={(e) => setBookCategory(e.target.value)}
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Description:</FormLabel>
                    <Textarea
                        value={bookDescription}
                        onChange={(e) => setBookDescription(e.target.value)}
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Imagen</FormLabel>
                    <InputGroup>
                        <Input
                            type="file"
                            onChange={(e) =>
                                setBookFile(
                                    e.target.files ? e.target.files[0] : null
                                )
                            }
                        />
                        <InputRightElement width="6rem">
                            <Button
                                size="sm"
                                onClick={handleUpload}
                                colorScheme="teal"
                            >
                                Upload
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormHelperText>
                        Selecciona una imagen en formato .png
                    </FormHelperText>
                    <FormHelperText>{`Tamaño no mayor a 20kb`}</FormHelperText>
                </FormControl>
            </form>
        </Box>
    );
};

export default UploadBook;
