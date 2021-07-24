import React from 'react'
import { Center, Heading, Stack } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'
import ReactMarkdown from 'react-markdown'
import { FaArrowLeft } from "react-icons/fa";
import { Box, IconButton } from "@chakra-ui/react"
import Footer from './Footer';
// import { Heading } from '@chakra-ui/layout'

export default function BlogComponent(props) {
    return (
        <>
        <IconButton margin={'10px'} aria-label="Back" icon={<FaArrowLeft />} onClick={() => {props.setView('cards')}}/>
        <Center>
            <Stack className='blog-body'>
                <Box className={'background-image'} borderRadius='xl'><Image src={props.image} width='100%'></Image></Box>
                <br/>
                <Heading textAlign='center'>{props.heading}</Heading>
                <br />
                <ReactMarkdown>{'****'}</ReactMarkdown>
                <Box p='10' lineHeight='7' whiteSpace='break-spaces'><ReactMarkdown>{props.markdown}</ReactMarkdown></Box>
                <Footer></Footer>
            </Stack>
        </Center>
        </>
    )
}
