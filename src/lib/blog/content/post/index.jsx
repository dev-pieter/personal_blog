import { Center, Heading, HStack, Stack } from "@chakra-ui/layout";
import { Box, IconButton, Kbd, Image } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { FastCommentsCommentWidget } from "fastcomments-react";
import { extractMetaData, hasKey } from "../../../utlis/utils";
import { withRouter } from "react-router-dom";

import { Footer, SyntaxHighlight } from "../../../components";
import { config } from "../../../../blog.config";
import SEO from "../../../seo/seo";
import { fetchPostsById } from "../../../../controllers/postController";

const base_url = config.blog_api_url;

function BlogComponent({ history }) {
  const [post, setPost] = useState();
  const [offset, setOffset] = useState(0);
  const toast = useToast();
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery("post_" + id, () =>
    fetchPostsById(id)
  );

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (data && !post && !data[0].markdown.content) {
      const parsedPost = parseMeta(data[0]);
      setPost({ ...parsedPost });
    }

    if (!localStorage.getItem(id)) {
      axios.post(base_url + "/add_view", { id: id });
      localStorage.setItem(id, "counted");
    }
  }, [data]);

  const handleCopy = async () => {
    toast({
      title: "Link copied!",
      status: "success",
    });
  };

  if (isLoading || !post) {
    return <Center>Loading...</Center>;
  }

  return (
    <>
      {typeof post.markdown.content === "string" && (
        <SEO
          title={post.heading}
          description={post.markdown.content.slice(
            0,
            post.markdown.content.indexOf(".")
          )}
        />
      )}
      <HStack
        position={"fixed"}
        top={"90px"}
        mb="10px"
        ml={{ base: "10px", md: "-120px" }}
        zIndex={"100"}
        opacity={offset > 100 ? "100" : "0"}
      >
        <Box onClick={() => history.goBack()}>
          <IconButton
            borderRadius={"0"}
            border={"1px solid black"}
            aria-label="Back"
            icon={<FaArrowLeft />}
            bg={"white"}
            title="Go Back"
            _hover={{ boxShadow: "4px 4px lightGrey" }}
          />
        </Box>
        <CopyToClipboard onCopy={handleCopy} text={window.location}>
          <IconButton
            borderRadius={"0"}
            border={"1px solid black"}
            icon={<FaShareAlt />}
            bg={offset > 0 && "white"}
            title="Copy Link to Clipboard"
            _hover={{ boxShadow: "4px 4px lightGrey" }}
          />
        </CopyToClipboard>
      </HStack>
      <Center>
        <Stack width="100%" bg={"white"} border={"1px solid black"} p={"20px"}>
          <Heading textAlign="left" fontSize="34px" marginBottom={"10px"}>
            {post.heading}
          </Heading>
          <Center border={"1px solid black"} p={"10px"} marginBottom={"10px"}>
            <Image src={post.img_url} w={"150px"}></Image>
          </Center>
          <br />
          <Box
            lineHeight="20px"
            whiteSpace="break-spaces"
            textAlign="justify"
            paddingBottom="28px"
          >
            {hasKey(post.markdown.metaData, "tags") && (
              <HStack style={{ paddingBottom: "28px", paddingTop: "28px" }}>
                {JSON.parse(post.markdown.metaData.tags).map((tag) => {
                  return <Kbd key={tag}>{tag}</Kbd>;
                })}
              </HStack>
            )}
            <ReactMarkdown
              children={post.markdown.content}
              components={SyntaxHighlight}
            />
          </Box>
          <FastCommentsCommentWidget
            tenantId={"_U40v-B5ayp"}
            urlId={post.heading}
          />
        </Stack>
      </Center>
    </>
  );
}

export default withRouter(BlogComponent);

const parseMeta = (data) => {
  const [rawMeta, metaData] = extractMetaData(data.markdown);

  if (Object.keys(metaData).length === 0) {
    data.markdown = { content: data.markdown, metaData: {} };
    return data;
  }

  data.markdown = { content: data.markdown.replace(rawMeta[0], ""), metaData };

  return data;
};
