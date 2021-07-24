import React from 'react'
import { Center, Heading, Stack } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'
import ReactMarkdown from 'react-markdown'
// import { Heading } from '@chakra-ui/layout'

export default function BlogComponent(props) {
    return (
        <Center maxH={'90vh'} overflowY='scroll' className="example">
            <Stack maxW={'60vw'}>
            <Image className={'background-image'} src={props.image} ></Image>
            <br/>
            <Heading>{props.heading}</Heading>
            <br />
            <ReactMarkdown>{'****'}</ReactMarkdown>
            <ReactMarkdown>{props.markdown}</ReactMarkdown>
            </Stack>
        </Center>
    )
}
