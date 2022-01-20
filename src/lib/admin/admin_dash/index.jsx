import React from 'react'
import { Center, Heading, Stack } from '@chakra-ui/react'
import { TableView } from '../../components'
import AdPost from '../add_post'

export default function Dashboard() {
    return (
        <Center>
            <Stack w='95%'>
                <Heading>Posts</Heading>
                <TableView children={<AdPost />}/>
            </Stack>
        </Center>
    )
}
