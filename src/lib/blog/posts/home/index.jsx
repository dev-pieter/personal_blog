import { useState, useEffect } from "react";
import { Center, Heading, Stack, HStack, Box } from "@chakra-ui/react";
import HomePost from "./home.md";
import ReactMarkdown from "react-markdown";
import { Footer } from "../../../components";

export default function Blog() {
  const [markdown, setMarkdown] = useState({
    text: "",
  });

  useEffect(() => {
    fetch(HomePost)
      .then((res) => res.text())
      .then((text) => {
        setMarkdown({
          text,
        });
      });
  }, []);

  return (
    <>
      <Center maxWidth="100vw">
        <Stack maxW="65%" className="blog-body">
          <Center className="bg-change" minH="20vh" borderRadius="xl" p="2">
            <Heading
              fontSize="3xl"
              textColor="white"
              fontWeight="bold"
              textAlign="center"
            >
              Welcome to my blog 🚀.
            </Heading>
          </Center>
          <br />
          <Center>
            <Box
              lineHeight="20px"
              whiteSpace="break-spaces"
              maxW="100%"
            >
              <ReactMarkdown>{markdown.text}</ReactMarkdown>
            </Box>
          </Center>
          <Footer />
        </Stack>
      </Center>
    </>
  );
}
