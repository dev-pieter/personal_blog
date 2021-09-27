import React, { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Image,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiMenu,
} from 'react-icons/fi';
import Footer from '../blog/components/Footer';

// export default function Navbar() {
//   return (
//     <Center padding='5'>
//         <Tabs variant="enclosed" width={'100vw'} className='bg-change' borderRadius={"xl"} textColor='white'>
//           <TabList boxShadow={'lg'} height={'60px'}>
//             <Link to='/'><Tab height='60px'><Heading fontFamily={'monospace'} fontSize={'x-large'}>✌️ dev_pieter</Heading></Tab></Link>
//             <Link to='/daily'><Tab height='60px'><Heading fontSize={'sm'} fontFamily={'monospace'}>Daily Dev</Heading></Tab></Link>
//             <Link to='/tutorials'><Tab height='60px'><Heading fontSize={'sm'} fontFamily={'monospace'}>Tutorials</Heading></Tab></Link>
//           </TabList >
//         </Tabs>
//     </Center>
//   )
// }
const LinkItems = [
  { name: 'daily dev', icon: 'https://images.unsplash.com/photo-1533279443086-d1c19a186416?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80', path: "/daily" },
  { name: 'tutorials', icon: 'https://images.unsplash.com/photo-1510843572979-e4b9e790fdd7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80', path: "/tutorials"},
];

export default function SimpleSidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="4" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        ✌️ dev_pieter
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
      <Box position='absolute' w={'100%'} bottom={3}>
        <Footer/>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, path, children, ...rest }) => {
  return (
    <Link href={path} style={{ textDecoration: 'none' }}>
      <Flex
        fontFamily="monospace"
        fontSize="16"
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Image
            mr="4"
            _groupHover={{
              color: 'white',
            }}
            
            src={icon}
            boxSize={'40px'}
            borderRadius={'full'}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="xl" ml="8" fontFamily="monospace" fontWeight="bold">
      ✌️ dev_pieter
      </Text>
    </Flex>
  );
};
