import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { HStack, Heading } from '@chakra-ui/layout'
import Blog from '../blog/posts/home'
import DailyDev from '../blog/posts/daily_dev'

export default function Navbar() {
  return (
    <HStack position={'fixed'} top={'0'}>
        <Tabs variant="enclosed" minW={'100vw'}>
          <TabList boxShadow={'lg'}>
            <Tab><Heading>💻 dev_pieter</Heading></Tab>
            <Tab>Daily Dev</Tab>
            <Tab>Two</Tab>
          </TabList >
          <TabPanels >
            <TabPanel>
              <Blog/>
            </TabPanel>
            <TabPanel>
              <DailyDev></DailyDev>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
    </HStack>
  )
}
