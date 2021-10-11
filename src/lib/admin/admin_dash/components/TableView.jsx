import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Edit from './Edit'
import AddPost from '../../add_post'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Center
  } from "@chakra-ui/react"

const base_url = 'https://api.devpieter.co.za'

export default function TableView() {
    const blogs_daily = useQuery('posts_' + "daily", () => {
        return axios.get(base_url + '/get_' + "daily")
            .then(res => {
                // console.log(res)
                return res.data
            })
    })

    const blogs_tutorial = useQuery('posts_' + "tutorial", () => {
        return axios.get(base_url + '/get_' + "tutorial")
            .then(res => {
                // console.log(res)
                return res.data
            })
    })

    if(blogs_daily.isLoading || blogs_tutorial.isLoading){
        return <div>Loading...</div>
    }

    return (
        <>
        <Table variant="striped" colorScheme="blue">
            <Thead>
                <Tr>
                <Th>Title</Th>
                <Th>Views</Th>
                <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td fontWeight='bold'>DAILY</Td>
                    <Td/>
                    <Td/>
                </Tr>
                {blogs_daily.data.map(x => (
                    <Tr>
                        <Td>{x.heading}</Td>
                        <Td>{x.views || 0}</Td>
                        <Td><Edit post={x}/></Td>
                    </Tr>
                ))}
                <Tr>
                    <Td fontWeight='bold'>TUTORIALS</Td>
                    <Td/>
                    <Td/>
                </Tr>
                {blogs_tutorial.data.map(x => (
                    <Tr>
                        <Td>{x.heading}</Td>
                        <Td>{x.views || 0}</Td>
                        <Td><Edit post={x}/></Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
        <Center pt='6'><AddPost/></Center>
        </>
    )
}
