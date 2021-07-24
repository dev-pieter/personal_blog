import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Center } from '@chakra-ui/react'
import Card from '../../components/Card'
import { useState } from 'react'
import BlogComponent from '../../components/BlogComponent'

const base_url = 'http://178.128.168.53:3000'

export default function DailyDev() {
    const [view, setView] = useState('cards')
    const blogs = useQuery('daily', () => {
        return axios.get(base_url + '/get_daily')
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

    if(view === 'cards'){
        return (
            <Center minW='100vw'>
                {blogs.data.map((item, key) => {
                    return <div onClick={() => handleView(item)}><Card key={key} author={item.author} heading={item.heading} url={item.img_url}></Card></div>
                })}
            </Center>
        )
    }
    
    return (
        <BlogComponent image={view.img_url} heading={view.heading} markdown={view.markdown}></BlogComponent>
    )
}
