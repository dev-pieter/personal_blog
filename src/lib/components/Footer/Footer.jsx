import React, { useContext } from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Center, HStack, Link, Box, Text, Stack } from "@chakra-ui/layout";

import { ColorContext } from "../../../providers/ContextProvider";

export default function Footer() {
  const darkMode = useContext(ColorContext);

  return (
    <Center>
      <Stack>
        <HStack p={"10"} spacing={"5"}>
          <Box _hover={{ transform: "scale(1.2)" }} cursor="pointer">
            <Link
              href="https://github.com/dev-pieter"
              color={darkMode ? "white" : "black"}
            >
              <FaGithub fontSize={"25px"} />
            </Link>
          </Box>
          <Box _hover={{ transform: "scale(1.2)" }} cursor="pointer">
            <Link
              href="https://www.linkedin.com/in/pieternortje"
              color={darkMode ? "white" : "black"}
            >
              <FaLinkedinIn fontSize={"25px"} />
            </Link>
          </Box>
        </HStack>
        <Text color={"gray.400"}>
          © Pieter Nortje - {new Date().getFullYear()}
        </Text>
      </Stack>
    </Center>
  );
}
