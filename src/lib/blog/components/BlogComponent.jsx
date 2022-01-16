import React from 'react'
import { Center, Heading, HStack, Stack } from '@chakra-ui/layout'
import ReactMarkdown from 'react-markdown'
import { FaArrowLeft } from "react-icons/fa";
import { Box, IconButton } from "@chakra-ui/react"
import Footer from './Footer';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { FaShareAlt } from 'react-icons/fa'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useToast } from '@chakra-ui/toast';
// import { Heading } from '@chakra-ui/layout'

export default function BlogComponent() {
    const toast = useToast()
    const { id } = useParams()
    const base_url = 'https://api.devpieter.co.za/'
    // const base_url = "http://172.17.37.190:3001/"

    const post = useQuery('post_' + id, () => {
        return axios.get(base_url + `post/${id}`)
            .then(res => {
                return res.data
            })
    }, {
        onSuccess: async (data) => {
            const id = data[0]._id
            if (! localStorage.getItem(id)){
                await axios.post(base_url + 'add_view', { id: id })
                localStorage.setItem(id, "counted")
            }
        }
    })

    const handleCopy = async () => {
        toast({
            title: "Link copied!",
            status: "success"
        })
    }

    if(post.isLoading){
        return <Center>Loading...</Center>
    }

    return (
        <>
        <HStack>
            <Link to={`/${post.data[0].category}`}><IconButton margin={'10px'} aria-label="Back" icon={<FaArrowLeft />}/></Link>
            <CopyToClipboard onCopy={handleCopy} text={window.location}>
                <IconButton icon={<FaShareAlt />}/>
            </CopyToClipboard>
        </HStack>
        <Center>
            <Stack className='blog-body' maxW={'80%'}>
                <Heading textAlign='center'>{post.data[0].heading}</Heading>
                <br />
                <ReactMarkdown>{'****'}</ReactMarkdown>
                <Box lineHeight='20px' whiteSpace='break-spaces' textAlign='justify'><ReactMarkdown>{post.data[0].markdown}</ReactMarkdown></Box>
                <Footer></Footer>
            </Stack>
        </Center>
        </>
    )
}
