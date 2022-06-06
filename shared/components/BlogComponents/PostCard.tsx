import {
  Box,
  Heading,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

const PostCard = (props: any) => {
  //   const darkMode = useContext(ColorContext);
  const IMAGE = props.url;

  return (
    <Stack
      bg={"none"}
      color="white"
      padding={"20px"}
      sx={{ border: `1px solid ${"white"}` }}
      _hover={{
        boxShadow: `6px 6px ${"white"}`,
      }}
      transition={"box-shadow 0.1s"}
    >
      <HStack>
        <Stack textAlign="left" spacing={3} mr={"28px"}>
          <Heading
            cursor={"pointer"}
            onClick={() => props.history.push(props.postLink)}
            fontFamily={"monospace"}
            textAlign={"left"}
            fontSize={"2xl"}
            fontWeight={500}
            color={"white"}
            _hover={{ textDecoration: "underline" }}
          >
            {props.heading}
          </Heading>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"capitalize"}>
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
        <Spacer />
        <Box width={"130px"} height={"130px"} maxW={"100%"}>
          <Image
            alt={props.heading}
            rounded={"lg"}
            height={"100%"}
            width={"100%"}
            objectFit={"contain"}
            src={IMAGE}
          />
        </Box>
      </HStack>
      <Box textAlign={"justify"} color={"gray.400"}>
        {props.renderIntroBody && (
          <Box pt={"10px"}>
            {props.renderIntroBody()}
            <Box
              color={"orange"}
              pt="10px"
              _hover={{ textDecoration: "underline" }}
            >
              <Link href={props.postLink}>Read more</Link>
            </Box>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default PostCard;
