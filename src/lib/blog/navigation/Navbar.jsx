import {
  Box,
  Center,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link, withRouter } from "react-router-dom";

import { config } from "../../../blog.config";
import { Footer } from "../../components";

const LinkItems = config.blog_categories;

function SimpleSidebar({ children, history }) {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Center
        bg={"white"}
        zIndex="10"
        pl="10px"
        pt="10px"
        display={{ base: "block", md: "none" }}
      >
        <Text
          fontSize="xl"
          ml="8"
          fontFamily="monospace"
          fontWeight="bold"
          mr="4"
        >
          {config.blog_name}
        </Text>
      </Center>
      <MobileNav history={history} />
      <Box p="4" width={{ base: "100%", md: "796px" }} margin="auto">
        {children}
        <Footer></Footer>
      </Box>
    </Box>
  );
}

const NavItem = ({ icon, path, children, active, ...rest }) => {
  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <Flex
        fontFamily="monospace"
        fontSize="16"
        align="center"
        ml="6"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        textDecoration={active && "underline"}
        color={active ? "orange" : "black"}
        _hover={{ color: "orange" }}
        {...rest}
      >
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ history, ...rest }) => {
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
      ml={0}
      px={4}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      position={"sticky"}
      top={"0"}
      zIndex={"10"}
      {...rest}
    >
      <Text
        fontSize="xl"
        ml="8"
        fontFamily="monospace"
        fontWeight="bold"
        mr="4"
        display={{ base: "none", md: "block" }}
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
        <Box _hover={{ transform: "scale(1.2)" }} cursor="pointer">
          <Link href="https://github.com/dev-pieter">
            <FaGithub fontSize={"25px"} />
          </Link>
        </Box>
        <Box _hover={{ transform: "scale(1.2)" }} cursor="pointer">
          <Link href="https://www.linkedin.com/in/pieternortje">
            <FaLinkedinIn fontSize={"25px"} />
          </Link>
        </Box>
      </HStack>
    </Flex>
  );
};

export default withRouter(SimpleSidebar);
