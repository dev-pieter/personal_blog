import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import { ColorContext } from "../../../providers/ContextProvider";

export default function Card(props) {
  const darkMode = useContext(ColorContext);
  const IMAGE = props.url;

  return (
    <Center pb={6}>
      <Stack
        bg={darkMode ? "none" : "white"}
        padding={"20px"}
        sx={{ border: `1px solid ${darkMode ? "white" : "black"}` }}
        _hover={{
          boxShadow: `6px 6px ${darkMode ? "white" : "lightGrey"}`,
        }}
        transition={"box-shadow 0.1s"}
      >
        <Box display={"flex"} gap={"30px"} alignItems={"center"}>
          <Center width={{ base: "100%", md: "70%" }}>
            <Stack textAlign="left" spacing={3} h={"100%"}>
              <Heading
                cursor={"pointer"}
                onClick={() => props.history.push(props.postLink)}
                fontFamily={"monospace"}
                textAlign={"left"}
                fontSize={"2xl"}
                fontWeight={500}
                color={darkMode ? "white" : "black"}
                _hover={{ textDecoration: "underline" }}
              >
                {props.heading}
              </Heading>
              <Text
                color={darkMode ? "gray.200" : "gray.500"}
                fontSize={"sm"}
                textTransform={"capitalize"}
              >
                {props.author}
              </Text>
              <HStack fontSize={"xs"}>
                <Box padding={"3px 6px"} bg={"black"} color={"white"}>
                  {props.date}
                </Box>
                <Box padding={"3px 6px"} bg={"black"} color={"white"}>
                  {props.readTime}
                </Box>
              </HStack>
            </Stack>
          </Center>
          <Center className="card-image" width={"30%"}>
            <Box
              rounded={"lg"}
              pos={"relative"}
              width={"130px"}
              height={"130px"}
              maxW={"100%"}
            >
              <Image
                rounded={"lg"}
                height={"100%"}
                width={"100%"}
                objectFit={"contain"}
                src={IMAGE}
              />
            </Box>
          </Center>
          {/* <Stack direction={'row'} align={'center'}>
                    <Text fontWeight={800} fontSize={'xl'}>
                    $57
                    </Text>
                    <Text textDecoration={'line-through'} color={'gray.600'}>
                    $199
                    </Text>
                </Stack> */}
        </Box>
        <Box textAlign={"justify"} color={darkMode ? "gray.200" : "gray.500"}>
          {props.renderIntroBody && (
            <Box pt={"10px"}>
              {props.renderIntroBody()}
              <Text
                textDecoration={"underline"}
                _hover={{ color: "orange" }}
                cursor={"pointer"}
                onClick={() => props.history.push(props.postLink)}
                pt={"5px"}
                pb={"28px"}
                width={"fit-content"}
              >
                Read more
              </Text>
            </Box>
          )}
        </Box>
      </Stack>
    </Center>
  );
}
