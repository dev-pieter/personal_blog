import React from 'react'
import { Center, Heading, Stack } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'
import ReactMarkdown from 'react-markdown'
import { FaArrowLeft } from "react-icons/fa";
import { Box, IconButton } from "@chakra-ui/react"
import Footer from './Footer';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
// import { Heading } from '@chakra-ui/layout'

export default function BlogComponent() {
    const { id } = useParams()
    const base_url = 'https://api.devpieter.co.za'

    const post = useQuery('post_' + id, () => {
        return axios.get(base_url + `/post/${id}`)
            .then(res => {
                return res.data
            })
    })

    if(post.isLoading){
        return <Center>Loading...</Center>
    }

    return (
        <>
        <Link to={`/${post.data[0].category}`}><IconButton margin={'10px'} aria-label="Back" icon={<FaArrowLeft />}/></Link>
        <Center>
            <Stack className='blog-body' maxW={'80%'}>
                <Heading textAlign='center'>{post.data[0].heading}</Heading>
                <br />
                <ReactMarkdown>{'****'}</ReactMarkdown>
                <Box p='10' lineHeight='20px' whiteSpace='break-spaces'><ReactMarkdown>{post.data[0].markdown}</ReactMarkdown></Box>
                <Footer></Footer>
            </Stack>
        </Center>
        </>
    )
}
