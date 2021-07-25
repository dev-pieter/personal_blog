import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
  
  export default function Login(props) {
    const [u, setU] = useState('')
    const [p, setP] = useState('')
    const base_url = 'http://localhost:3000'

    const login = useMutation((obj) => {
        return axios.post(base_url + '/login', obj)
            .then(res => {
                console.log(res.data)
                if(res.data.success !== undefined){
                    console.log('success')
                    sessionStorage.setItem('token', res.data.success)
                    props.setToken(res.data.success)
                    return res.data
                }else{
                    throw 'Error'
                }
            })
    })

    const handleP = (e) => {
        console.log(e.target.value)

        setP(e.target.value)
    }

    const handleU = (e) => {
        console.log(e.target.value)

        setU(e.target.value)
    }

    const handleLogin = () => {
        const obj = {
            username : u,
            password : p,
        }

        login.mutate(obj)

        }

    return (
      <Flex
        minH={'100vh'}
        minW={'100vw'}
        zIndex={'-1'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        position='fixed'
        top='0'>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} minW="40vw">
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in as admin</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to add / edit blog post ✌️
            </Text>
            {login.isError ? <Text fontSize={'lg'} color={'red'}>LOGIN ERROR {}</Text> : null}
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email or Username</FormLabel>
                <Input type="text" onChange={handleU}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={handleP}/>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleLogin}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }