import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Input,
    Textarea,
    Stack,
    Select,
    HStack
  } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/hooks'
import { useMutation } from 'react-query'
import axios from 'axios'

// const base_url = "http://172.17.37.190:3001/"
const base_url = 'https://api.devpieter.co.za/'

export default function Edit({ post }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const update = useMutation(async (obj) => {
        const res = await axios.post(base_url + 'update_post', obj)
        console.log(res.data)
    })

    const handleChange = (e) => {
        e.preventDefault()

        const obj = {
            ...post,
            category: e.target[0].value,
            heading: e.target[1].value,
            img_url: e.target[2].value,
            markdown: e.target[3].value,
        }

        update.mutate(obj)

    }

    return (
        <>
        <HStack>
            <Button bg='white' onClick={onOpen}>edit</Button>
            <Button colorScheme='red'>delete</Button>
        </HStack>
        

        <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Edit post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <form onSubmit={handleChange}>
                <Stack minW={'100%'}>
                    <Text as='label'>Category</Text>
                    <Select placeholder="Select category" name='category' defaultValue={post.category}>
                        <option value="daily">Daily</option>
                        <option value="tutorial">Tutorial</option>
                    </Select>
                    <Text as='label'>Heading</Text>
                    <Input placeholder="Post heading" defaultValue={post.heading} name='heading'/>
                    <Text as='label'>Image url</Text>
                    <Input placeholder="img url" defaultValue={post.img_url} name='img_url'/>
                    <Text as='label'>Markdown text area</Text>
                    <Textarea minH={'600px'} placeholder="markdown" defaultValue={post.markdown} name='markdown'/>
                    <Button bg='black' color='white' mr={3} type='submit'>
                    Save
                    </Button>
                </Stack>
                </form>
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}
