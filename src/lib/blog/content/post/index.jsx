import { Center, Heading, HStack, Stack } from "@chakra-ui/layout";
import { Box, IconButton, Kbd } from "@chakra-ui/react";
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

import { Footer, SyntaxHighlight } from "../../../components";
import { config } from "../../../../blog.config";
import SEO from "../../../seo/seo";
import { fetchPostsById } from "../../../../controllers/postController";

const base_url = config.blog_api_url;

export default function BlogComponent() {
  const [post, setPost] = useState();
  const toast = useToast();
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery("post_" + id, () =>
    fetchPostsById(id)
  );

  useEffect(() => {
    if (data && !post) {
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
      <SEO
        title={post.heading}
        description={post.markdown.content.slice(
          0,
          post.markdown.content.indexOf(".")
        )}
      />
      <HStack>
        <Link to={`/${post.category}`}>
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
        <Stack width="100%">
          <Heading textAlign="center">{post.heading}</Heading>
          <br />
          <ReactMarkdown>{"****"}</ReactMarkdown>
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
          <Footer></Footer>
        </Stack>
      </Center>
    </>
  );
}

const parseMeta = (data) => {
  const [rawMeta, metaData] = extractMetaData(data.markdown);

  if (Object.keys(metaData).length === 0) {
    data.markdown = { content: data.markdown, metaData: {} };
    return data;
  }

  data.markdown = { content: data.markdown.replace(rawMeta[0], ""), metaData };

  console.log(data);

  return data;
};
