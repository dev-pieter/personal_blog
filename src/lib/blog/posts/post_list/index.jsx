import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Center, SimpleGrid } from '@chakra-ui/react'
import Card from '../../components/Card'
import { useState } from 'react'
import BlogComponent from '../../components/BlogComponent'
import { Link, Route } from 'react-router-dom'

const base_url = 'https://api.devpieter.co.za'

export default function PostList(props) {
    const [view, setView] = useState('cards')
    const blogs = useQuery('posts_' + props.cat, () => {
        return axios.get(base_url + '/get_' + props.cat)
            .then(res => {
                // console.log(res)
                return res.data
            })
    })

    const handleView = (index) => {
        console.log(index)
        setView(index)
    }

    if(blogs.isLoading){
        return <Center>Loading</Center>
    }

    if(blogs.isError || blogs.data.length === 0){
        return <Center>No posts yet...</Center>
    }

    if(view === 'cards'){
        return (
            <Center minW='100%'>
                <SimpleGrid columns={[1, null, 3]} spacing='40px'>
                {blogs.data.map((item, key) => {
                    return <div><Link to={`/posts/${item._id}`}><Card key={key} author={item.author} heading={item.heading} url={item.img_url}></Card></Link></div>
                })}
                </SimpleGrid>
            </Center>
        )
    }
    
}
