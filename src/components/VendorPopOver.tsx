import React from 'react';
import {
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    PopoverFooter,
    ButtonGroup,
    useDisclosure,
    Image,
} from '@chakra-ui/react';
import { User } from '../store/interfaces/user';

interface VendorPopOverProps {
    vendor: User;
}

const VendorPopOver: React.FC<VendorPopOverProps> = ({ vendor }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
                <Image
                    borderRadius="full"
                    boxSize="35px"
                    src={vendor.picture}
                    alt={vendor.name}
                    cursor={'pointer'}
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>{vendor.name}</PopoverHeader>
                <PopoverBody>
                    <p>{vendor.email}</p>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default VendorPopOver;
