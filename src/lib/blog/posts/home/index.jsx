import { useState, useEffect } from 'react';
import { Center, Heading, Stack, HStack, Box } from "@chakra-ui/react"
import HomePost from './home.md'
import ReactMarkdown from 'react-markdown'
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Blog() {
    const [markdown, setMarkdown] = useState({
        text : ''
    })

    useEffect(() => {
        fetch(HomePost)
            .then(res => res.text())
            .then(text => {
                setMarkdown({
                    text
                })
            })
    }, [])

    
        return (
            <>
                <Center maxWidth='100vw'>
                    <Stack maxWidth='80vw'>
                        <Center className='bg-change' minH='30vh' borderRadius='xl' p='2'>
                            <Heading fontSize='2xl' textColor='white' textAlign='center'>Hello friends 👋. Welcome to my blog 🚀.</Heading>
                        </Center>
                        <br/>
                        <Box className='blog-body' lineHeight='20px' whiteSpace='break-spaces'><ReactMarkdown>{markdown.text}</ReactMarkdown></Box>
                        <Center>
                            <HStack p={'10'} spacing={'5'}>
                                <a href='https://github.com/pietabrood' className='home-i'>
                                    <FaGithub width='20px' fontSize={'25px'}/>
                                </a>
                                <a href='https://www.linkedin.com/in/pieternortje' className='home-i'>
                                    <FaLinkedinIn width='20px' fontSize={'25px'}/>
                                </a>
                            </HStack>
                        </Center>
                    </Stack>
                </Center>
            </>
        );
    
}
