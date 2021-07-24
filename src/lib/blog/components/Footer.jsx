import React from 'react'
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Center, HStack } from '@chakra-ui/layout'

export default function Footer() {
    return (
        <Center>
            <HStack p={'10'} spacing={'5'}>
                <a href='https://github.com/pietabrood' className='home-i'>
                    <FaGithub width='20px' fontSize={'25px'}/>
                </a>
                <a href='https://www.linkedin.com/in/pieternortje' className='home-i'>
                    <FaLinkedinIn width='20px' fontSize={'25px'}/>
                </a>
            </HStack>
        </Center>
    )
}
