import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    SimpleGrid,
    HStack,
    Image,
    Badge,
    Kbd
} from '@chakra-ui/react';
import { FaShareAlt, FaEye } from 'react-icons/fa'

export default function Card(props) {
const IMAGE = props.url
return (
    <Center cursor={'pointer'}>
    <Box
        role={'group'}
        p={6}
        maxW={'100%'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
            <SimpleGrid columns={[1,1,2]} spacing={'20px'} alignItems={'center'}>
                <Center>
                <Box
                rounded={'lg'}
                pos={'relative'}
                width={'282px'}
                height={'230px'}
                maxW={'100%'}
                _after={{
                    transition: 'all .3s ease',
                    content: '""',
                    w: 'full',
                    h: 'full',
                    pos: 'absolute',
                    top: 5,
                    left: 0,
                    backgroundImage: `url(${IMAGE})`,
                    filter: 'blur(15px)',
                    zIndex: -1,
                }}
                _groupHover={{
                    _after: {
                    filter: 'blur(20px)',
                    },
                }}>
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        src={IMAGE}
                    />
                </Box>
                </Center>
                <Center>
                    <Stack textAlign='center' spacing={6} h={'100%'}>
                        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            {props.author}
                        </Text>
                        <Heading fontFamily={'monospace'} textAlign={'center'} fontSize={'2xl'} fontWeight={500}>
                            {props.heading}
                        </Heading>
                        <Center>
                        <HStack>
                            <Kbd colorScheme={'teal'}>Experience</Kbd>
                            <Kbd colorScheme={'green'}>Software</Kbd>
                            <Kbd colorScheme={'messenger'}>Coding</Kbd>
                        </HStack>
                        </Center>
                    </Stack>
                </Center>
                <HStack position='absolute' right={6} top={6} spacing={'3'} color={'gray.400'}>
                    <HStack spacing={'1'}>
                        <Text fontSize='sm'>0</Text>
                        <FaEye/>
                    </HStack>
                    <FaShareAlt/>
                </HStack>
                {/* <Stack direction={'row'} align={'center'}>
                    <Text fontWeight={800} fontSize={'xl'}>
                    $57
                    </Text>
                    <Text textDecoration={'line-through'} color={'gray.600'}>
                    $199
                    </Text>
                </Stack> */}
            </SimpleGrid>
    </Box>
    </Center>
);
}