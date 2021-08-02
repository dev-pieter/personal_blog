import React from 'react'
import { Tabs, TabList, Tab} from "@chakra-ui/react"
import { Heading, Center } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <Center padding='5'>
        <Tabs variant="enclosed" width={'100vw'} className='bg-change' borderRadius={"xl"} textColor='white'>
          <TabList boxShadow={'lg'} height={'60px'}>
            <Link to='/'><Tab height='60px'><Heading fontFamily={'monospace'} fontSize={'x-large'}>✌️ dev_pieter</Heading></Tab></Link>
            <Link to='/daily'><Tab height='60px'><Heading fontSize={'sm'} fontFamily={'monospace'}>Daily Dev</Heading></Tab></Link>
            <Link to='/tutorials'><Tab height='60px'><Heading fontSize={'sm'} fontFamily={'monospace'}>Tutorials</Heading></Tab></Link>
          </TabList >
        </Tabs>
    </Center>
  )
}
