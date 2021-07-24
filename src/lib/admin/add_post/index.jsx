import { Button, Center, Stack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { Input, Textarea } from "@chakra-ui/react"
import { useMutation } from 'react-query'
import axios from 'axios'

const base_url = 'http://178.128.168.53:3000'

export default function AddPost() {
    const [data, setData] = useState({
        category : "",
        author : "Pieter Nortje",
        heading : "",
        img_url : "",
        markdown : ""
    })

    const submit = useMutation((post) => {
        axios.post(base_url + '/add_post', {
            post
        }).then(res => {
            console.log(res.data)
            return res.data
        })
    })

    const handleCat = (e) => {
        setData({
            ...data,
            category : e.target.value
        })
    }

    const handleHead = (e) => {
        setData({
            ...data,
            heading : e.target.value
        })
    }

    const handleUrl = (e) => {
        setData({
            ...data,
            img_url : e.target.value
        })
    }

    const handleMarkdwn = (e) => {
        setData({
            ...data,
            markdown : e.target.value
        })
    }

    const handleSubmit = () => {
        const d = data

        submit.mutate(d)
    }

    return (
        <Center>
            <Stack minW={'50vw'}>
                <Input placeholder="category" onChange={handleCat}/>
                <Input placeholder="heading" onChange={handleHead}/>
                <Input placeholder="img url" onChange={handleUrl}/>
                <Textarea placeholder="markdown" onChange={handleMarkdwn}/>
                <Button onClick={handleSubmit}></Button>
            </Stack>
        </Center>
    )
}
