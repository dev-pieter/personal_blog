import { Center, Heading, HStack, Stack } from "@chakra-ui/layout";
import { Box, IconButton, Image, Kbd, Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { FastCommentsCommentWidget } from "fastcomments-react";
import React, { useContext, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { useParams, withRouter } from "react-router-dom";

import { config } from "../../../../blog.config";
import { fetchPostsById } from "../../../../controllers/postController";
import { ColorContext } from "../../../../providers/ContextProvider";
import { SyntaxHighlight } from "../../../components";
import SEO from "../../../seo/seo";
import { extractMetaData, hasKey } from "../../../utlis/utils";

const base_url = config.blog_api_url;

function BlogComponent({ history }) {
  const darkMode = useContext(ColorContext);

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
    return (
      <Center>
        <Spinner color={darkMode ? "white" : "black"} />
      </Center>
    );
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
            border={`1px solid ${darkMode ? "white" : "black"}`}
            aria-label="Back"
            icon={<FaArrowLeft />}
            bg={darkMode ? "none" : "white"}
            color={darkMode ? "white" : "black"}
            title="Go Back"
            _hover={{ boxShadow: "4px 4px lightGrey" }}
          />
        </Box>
        <CopyToClipboard onCopy={handleCopy} text={window.location}>
          <IconButton
            borderRadius={"0"}
            border={`1px solid ${darkMode ? "white" : "black"}`}
            icon={<FaShareAlt />}
            bg={darkMode ? "none" : "white"}
            color={darkMode ? "white" : "black"}
            title="Copy Link to Clipboard"
            _hover={{ boxShadow: "4px 4px lightGrey" }}
          />
        </CopyToClipboard>
      </HStack>
      <Center>
        <Stack
          width="100%"
          bg={darkMode ? "none" : "white"}
          border={`1px solid ${darkMode ? "white" : "black"}`}
          p={"20px"}
        >
          <Heading
            color={darkMode ? "white" : "black"}
            textAlign="left"
            fontSize="34px"
            marginBottom={"10px"}
          >
            {post.heading}
          </Heading>
          <Center
            border={`6px solid ${darkMode ? "white" : "black"}`}
            className={"bg-change"}
            p={"10px"}
            marginBottom={"10px"}
          >
            <Image src={post.img_url} w={"150px"}></Image>
          </Center>
          <br />
          <Box
            lineHeight="20px"
            whiteSpace="break-spaces"
            textAlign="justify"
            paddingBottom="28px"
            color={darkMode ? "white" : "black"}
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
            darkMode={darkMode}
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
