import { Center, Heading, HStack, Stack } from "@chakra-ui/layout";
import { Box, IconButton } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

import { Footer, SyntaxHighlight } from "..";
import { config } from "../../../blog.config";
import SEO from "../../seo/seo";

const base_url = config.blog_api_url;

// import { Heading } from '@chakra-ui/layout'

export default function BlogComponent() {
  const toast = useToast();
  const { id } = useParams();

  const post = useQuery(
    "post_" + id,
    () => {
      return axios.get(base_url + `/post/${id}`).then((res) => {
        return res.data;
      });
    },
    {
      onSuccess: async (data) => {
        const id = data[0]._id;
        if (!localStorage.getItem(id)) {
          await axios.post(base_url + "/add_view", { id: id });
          localStorage.setItem(id, "counted");
        }
      },
    }
  );

  const handleCopy = async () => {
    toast({
      title: "Link copied!",
      status: "success",
    });
  };

  if (post.isLoading) {
    return <Center>Loading...</Center>;
  }

  return (
    <>
      <SEO title={post.data[0].heading} description={post.data[0].markdown.slice(0, post.data[0].markdown.indexOf('.'))} />
      <HStack>
        <Link to={`/${post.data[0].category}`}>
          <IconButton
            margin={"10px"}
            aria-label="Back"
            icon={<FaArrowLeft />}
          />
        </Link>
        <CopyToClipboard onCopy={handleCopy} text={window.location}>
          <IconButton icon={<FaShareAlt />} />
        </CopyToClipboard>
      </HStack>
      <Center>
        <Stack className="blog-body" maxW={"65%"}>
          <Heading textAlign="center">{post.data[0].heading}</Heading>
          <br />
          <ReactMarkdown>{"****"}</ReactMarkdown>
          <Box lineHeight="20px" whiteSpace="break-spaces" textAlign="justify">
            <ReactMarkdown
              children={post.data[0].markdown}
              components={SyntaxHighlight}
            />
          </Box>
          <Footer></Footer>
        </Stack>
      </Center>
    </>
  );
}
