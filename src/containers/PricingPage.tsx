import React from 'react';
import {
    Box,
    Heading,
    Text,
    Stack,
    Button,
    Stat,
    StatLabel,
    StatNumber,
} from '@chakra-ui/react';

const PricingPage: React.FC = () => {
    return (
        <Box p={8}>
            <Heading mb={4} textAlign="center">
                {`Plan de Suscripción`}
            </Heading>
            <Box mt={5}>
                <Heading mb={4}>{`¿Porqué suscribirse a UniBookSwap?`}</Heading>
                <Stack spacing={4}>
                    <Text>
                        {`Puedes publicar todos los libros que quieras a la venta`}
                    </Text>
                    <Text>
                        {`No se te hará ningún cobro por comisión de venta`}
                    </Text>
                    <Text>
                        {`Podras editar y borrar tus libros publicados sin ningún costo`}
                    </Text>
                    {/* Add more benefits as needed */}
                </Stack>
            </Box>
            <Stack
                direction={['column', 'row']}
                spacing={8}
                align="center"
                justify="center"
                mt={4}
            >
                {/* Plan 1 */}
                <Box
                    maxW="md"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    bg="white"
                    p={6}
                    textAlign="center"
                >
                    <Heading fontSize="xl" color="black">
                        Plan Mensual
                    </Heading>
                    <Text color="gray.500" mt={2}>
                        Perfecto para vender tus libros
                    </Text>
                    <Stat>
                        <StatLabel>Price</StatLabel>
                        <StatNumber color="blue.600" fontSize="2xl">
                            $8 / mensual
                        </StatNumber>
                    </Stat>
                    <Button colorScheme="blue" mt={6}>
                        {`Suscríbete`}
                    </Button>
                </Box>

                <Box
                    maxW="md"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    bg="white"
                    p={6}
                    textAlign="center"
                >
                    <Heading fontSize="xl" color="black">
                        Plan Anual
                    </Heading>
                    <Text color="gray.500" mt={2}>
                        {`Ahorra pagando tu suscripción
                         una vez al año`}
                    </Text>
                    <Stat>
                        <StatLabel>Price</StatLabel>
                        <StatNumber
                            color="red.600"
                            fontSize="1xl"
                            textDecor={'line-through'}
                        >
                            $96 / anual
                        </StatNumber>
                        <StatNumber color="blue.600" fontSize="2xl">
                            $89 / anual
                        </StatNumber>
                    </Stat>
                    <Button colorScheme="blue" mt={6}>
                        {`Suscríbete`}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default PricingPage;
