import { useState, useEffect } from 'react';
import { Center, Heading, Stack, HStack, Box } from "@chakra-ui/react"
import HomePost from './home.md'
import ReactMarkdown from 'react-markdown'
import Footer from '../../components/Footer'

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
                    <Stack maxWidth='70%'>
                        <Center className='bg-change' minH='30vh' borderRadius='xl' p='2'>
                            <Heading fontSize='3xl' textColor='white' fontWeight="bold" textAlign='center'>Hello friends 👋. Welcome to my blog 🚀.</Heading>
                        </Center>
                        <br/>
                        <Box className='blog-body' lineHeight='20px' whiteSpace='break-spaces'><ReactMarkdown>{markdown.text}</ReactMarkdown></Box>
                        <Footer/>
                    </Stack>
                </Center>
            </>
        );
    
}
