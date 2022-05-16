import React from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Center, HStack, Link, Box, Text, Stack } from "@chakra-ui/layout";

export default function Footer() {
  return (
    <Center>
      <Stack>
        <HStack p={"10"} spacing={"5"}>
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
        <Text color={"gray.400"}>
          © Pieter Nortje - {new Date().getFullYear()}
        </Text>
      </Stack>
    </Center>
  );
}
