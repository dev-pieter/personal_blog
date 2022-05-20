import {
  Stack,
  Box,
  Center,
  HStack,
  Heading,
  Text,
  Spinner,
  Link,
  Skeleton,
} from "@chakra-ui/react";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { config } from "../../blog.config";

export interface Props {
  children: React.ReactNode;
}

const AppFrame: FunctionComponent<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Loading />
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
          <HStack flex={1}>
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
          <HStack color="white" pr="20px" gap="4px">
            {config.author_socials.map((item) => (
              <HStack
                key={item.link}
                cursor={"pointer"}
                _hover={{ color: "orange", textDecoration: "underline" }}
                color="white"
                fontSize={{ base: "20px", md: "25px" }}
              >
                <Link href={item.link}>
                  <Text>{item.icon}</Text>
                </Link>
              </HStack>
            ))}
          </HStack>
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
        <Center>
          <Text color={"gray.400"}>
            © {new Date().getFullYear()} - Pieter Nortje ✌️
          </Text>
        </Center>
      </Stack>
    </>
  );
};

const Loading: FunctionComponent<any> = (): null | JSX.Element => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.asPath, router.events]);

  if (loading) {
    return (
      <Skeleton
        height="3px"
        startColor="white"
        endColor="orange.500"
        speed={0.1}
      />
    );
  }

  return null;
};

export default AppFrame;
