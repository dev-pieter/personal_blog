import {
  Box,
  Center,
  Flex,
  HStack,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import { FaGithub, FaLinkedinIn, FaSun } from "react-icons/fa";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { ColorContext } from "../../../providers/ContextProvider";

import { config } from "../../../blog.config";
import { Footer } from "../../components";

const LinkItems = config.blog_categories;

function SimpleSidebar({ children, history, setDarkMode }) {
  const darkMode = useContext(ColorContext);

  return (
    <Box minH="100vh" bg={darkMode ? "gray.800" : "gray.100"}>
      <Center
        bg={"white"}
        zIndex="10"
        display={{ base: "block", md: "none" }}
        borderBottom={"1px solid black"}
        p={"10px"}
      >
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" mr="4">
          {config.blog_name}
        </Text>
      </Center>
      <MobileNav history={history} setDarkMode={setDarkMode} />
      <Box p="4" width={{ base: "100%", md: "796px" }} margin="auto">
        {children}
        <Footer></Footer>
      </Box>
    </Box>
  );
}

const NavItem = ({ icon, path, children, active, ...rest }) => {
  const darkMode = useContext(ColorContext);
  return (
    <RouterLink to={path} style={{ textDecoration: "none" }}>
      <Flex
        mr="6"
        fontFamily="monospace"
        fontSize="16"
        align="center"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        textDecoration={active && "underline"}
        color={active ? "orange.400" : `${darkMode ? "white" : "black"}`}
        _hover={{ color: "orange.300" }}
        gap="5px"
        {...rest}
      >
        {icon}
        {children}
      </Flex>
    </RouterLink>
  );
};

const MobileNav = ({ history, setDarkMode, ...rest }) => {
  const darkMode = useContext(ColorContext);

  const addDarkModeToStorage = () => {
    localStorage.setItem("dark-mode", darkMode ? "false" : "true");
    setDarkMode((prevMode) => !prevMode);
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const loadIndex = (path) => {
    const index = LinkItems.findIndex((item) => `/${item.path}` === path);
    setActiveIndex(index);
  };

  history.listen((location) => {
    loadIndex(location.pathname);
  });

  useEffect(() => {
    loadIndex(location.pathname);
  });

  return (
    <Flex
      height="20"
      alignItems="center"
      bg={darkMode ? "gray.900" : "white"}
      borderBottomWidth="1px"
      borderBottomColor={darkMode ? "gray.200" : "gray.700"}
      color={darkMode ? "white" : "black"}
      justifyContent="flex-start"
      position={"sticky"}
      top={"0"}
      zIndex={"10"}
      py="10px"
      px="10px"
      {...rest}
    >
      <Text
        fontSize="2xl"
        ml="8"
        fontFamily="monospace"
        fontWeight="bold"
        mr="8"
        p={"4px 10px"}
        display={{ base: "none", md: "block" }}
        border={`1px solid ${darkMode ? "white" : "black"}`}
        boxShadow={`4px 4px ${darkMode ? "white" : "lightGrey"}`}
      >
        {config.blog_name}
      </Text>
      {LinkItems.map((link, idx) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          path={`/${link.path}`}
          active={activeIndex === idx}
        >
          {link.name}
        </NavItem>
      ))}
      <HStack
        p={"10"}
        spacing={"5"}
        ml="auto"
        display={{ base: "none", md: "flex" }}
      >
        <FaSun
          fontSize={"25px"}
          onClick={() => addDarkModeToStorage()}
          cursor={"pointer"}
        ></FaSun>
        <Box _hover={{ transform: "scale(1.2)" }} cursor="pointer">
          <Link
            href="https://github.com/dev-pieter"
            target={"_blank"}
            title="dev-pieter | GitHub"
          >
            <FaGithub fontSize={"25px"} />
          </Link>
        </Box>
        <Box _hover={{ transform: "scale(1.2)" }} cursor="pointer">
          <Link
            href="https://www.linkedin.com/in/pieternortje"
            target={"_blank"}
            title="Pieter Nortje | LinkedIn"
          >
            <FaLinkedinIn fontSize={"25px"} />
          </Link>
        </Box>
      </HStack>
    </Flex>
  );
};

export default withRouter(SimpleSidebar);
