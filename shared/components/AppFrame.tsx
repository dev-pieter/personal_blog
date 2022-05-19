import { Stack, Box, Center, HStack, Heading, Text } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";

import { config } from "../../blog.config";

export interface Props {
  children: React.ReactNode;
}

const AppFrame: FunctionComponent<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <Stack minH="100vh" pb="28px" spacing={8} bg={"gray.800"}>
      <HStack
        height={"80px"}
        borderBottom="1px solid white"
        position={"sticky"}
        top={"0"}
        bg={"gray.900"}
        zIndex={"100"}
      >
        <Box
          mx={8}
          p={"6px 12px"}
          border={"1px solid white"}
          boxShadow={"5px 5px white"}
          display={{ base: "none", md: "block" }}
          color={"white"}
          bg={"none"}
        >
          <Heading fontFamily={"monospace"} fontSize="2xl">
            {config.blog_name}
          </Heading>
        </Box>
        {config.blog_categories.map((cat) => (
          <HStack
            key={cat.name}
            pr={4}
            onClick={() => router.push(`/${cat.path}`)}
            cursor={"pointer"}
            _hover={{ color: "orange", textDecoration: "underline" }}
            color="white"
          >
            <Text>{cat.icon}</Text>
            <Text>{cat.name}</Text>
          </HStack>
        ))}
      </HStack>
      <Center>
        <Box
          width={{ base: "100%", md: "768px" }}
          p={{ base: "3", md: "0" }}
          color="white"
        >
          {children}
        </Box>
      </Center>
    </Stack>
  );
};

export default AppFrame;
