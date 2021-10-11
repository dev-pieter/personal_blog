import React from 'react'
import { Center, Heading, Stack } from '@chakra-ui/react'
import TableView from './components/TableView'

export default function Dashboard() {
    return (
        <Center>
            <Stack w='95%'>
                <Heading>Posts</Heading>
                <TableView/>
            </Stack>
        </Center>
    )
}
