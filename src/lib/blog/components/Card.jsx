import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    HStack,
    Image,
    Badge
} from '@chakra-ui/react';
import { FaShareAlt, FaEye } from 'react-icons/fa'

export default function Card(props) {
const IMAGE = props.url
return (
    <Center cursor={'pointer'}>
    <Box
        role={'group'}
        p={6}
        maxW={'85%'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
            <HStack>
                <Box
                rounded={'lg'}
                pos={'relative'}
                height={'230px'}
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
                <Stack textAlign='center' spacing={3}>
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        {props.author}
                    </Text>
                    <Heading textAlign={'center'} fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {props.heading}
                    </Heading>
                    <Center>
                    <HStack>
                        <Badge colorScheme={'teal'}>Experience</Badge>
                        <Badge colorScheme={'green'}>Software</Badge>
                        <Badge colorScheme={'messenger'}>Coding</Badge>
                    </HStack>
                    </Center>
                </Stack>
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
            </HStack>
    </Box>
    </Center>
);
}