import { Box, Center, Heading, HStack, Kbd, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { config } from "../../../../blog.config";
import { Card, Footer } from "../../../components";
import SEO from "../../../seo/seo";
import { calculateReadTime, dynamicSort } from "../../../utlis/utils";
import HomePost from "./home.md";
import { SyntaxHighlight } from "../../../components";
import { Spinner } from "@chakra-ui/react";
import { extractMetaData } from "../../../utlis/utils";
import { fetchAllPosts } from "../../../../controllers/postController";

export default function Blog() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markdown, setMarkdown] = useState({
    text: "",
  });

  const { data, isError, isLoading } = useQuery("posts_all", fetchAllPosts);

  useEffect(() => {
    fetch(HomePost)
      .then((res) => res.text())
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let posts = [];

    if (data) {
      data.forEach((item) => {
        posts = [...posts, ...item];
      });

      setPost(posts.sort(dynamicSort("-created_at")));
    }
  }, [data]);

  if (loading || isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <SEO title="Home" />
      <Center>
        <Stack className="blog-body">
          <Center>
            <Stack spacing={"20px"}>
              <Box
                lineHeight="20px"
                whiteSpace="break-spaces"
                textAlign="justify"
                bg={"white"}
                border={"1px solid black"}
                p={"20px"}
              >
                {markdown.metaData && (
                  <HStack style={{ paddingBottom: "28px" }}>
                    {JSON.parse(markdown.metaData.tags).map((tag) => {
                      return <Kbd key={tag}>{tag}</Kbd>;
                    })}
                  </HStack>
                )}
                <ReactMarkdown
                  children={markdown}
                  components={SyntaxHighlight}
                />
              </Box>
              <p className="subHeading">Latest Post</p>
              {isLoading && (
                <Center>
                  <Spinner />
                </Center>
              )}
              {isError || (!post && <Center>No posts yet...</Center>)}
              {post.length && (
                <Link to={`/posts/${post[0]._id}`}>
                  <Card
                    author={post[0].author}
                    heading={post[0].heading}
                    url={post[0].img_url}
                    views={post[0].views}
                    readTime={
                      post[0].markdown &&
                      calculateReadTime(post[0].markdown) + " min read"
                    }
                    date={new Date(post[0].created_at).toDateString()}
                  ></Card>
                </Link>
              )}
            </Stack>
          </Center>
        </Stack>
      </Center>
    </>
  );
}
