import { useState, useEffect } from 'react';
import { Center, Heading, Stack } from "@chakra-ui/react"
import Navbar from './navbar';
import HomePost from '../posts/home/home.md'
import ReactMarkdown from 'react-markdown'

export default function Dashboard() {
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

    if(trans){
        return (
            <>
                <Navbar></Navbar>
                <Center>
                    <Stack p='10'>
                        <Heading>Hello friends 👋</Heading>
                        <br/>
                        <ReactMarkdown >{markdown.text}</ReactMarkdown>
                    </Stack>
                </Center>
            </>
        );
    }

    return (
        <Center className='bg-change' minH='100vh'>
            <Heading fontSize='2xl' textColor='white'>Hi, I'm Pieter! Welcome to my blog. <span className='rocket-hover' onClick={handleTrans}>🚀</span></Heading>
        </Center>
    )
}
