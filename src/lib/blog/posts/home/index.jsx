import { useState, useEffect } from 'react';
import { Center, Heading, Stack } from "@chakra-ui/react"
import Navbar from '../../../dashboard/navbar';
import HomePost from './home.md'
import ReactMarkdown from 'react-markdown'

export default function Blog() {
    const [trans, setTrans] = useState(0)
    const [markdown, setMarkdown] = useState({
        text : ''
    })

    const handleTrans = () => {
        setTrans(1)
    }

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
                <Center maxH={'90vh'} overflowY='scroll' className="example">
                    <Stack p='10'>
                    <Center className='bg-change' minH='20vh'>
                        <Heading fontSize='2xl' textColor='white'>Hello friends 👋. Welcome to my blog 🚀.</Heading>
                    </Center>
                    <Heading></Heading>
                    <br/>
                    <ReactMarkdown>{markdown.text}</ReactMarkdown>
                    </Stack>
                </Center>
            </>
        );
    
}
