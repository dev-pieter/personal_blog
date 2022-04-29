import { Box, Center, Heading, Stack } from "@chakra-ui/react";
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

const base_url = config.blog_api_url;

export default function Blog() {
  const [post, setPost] = useState([]);
  const [markdown, setMarkdown] = useState({
    text: "",
  });

  const postQuery = useQuery("posts_daily", () => {
    return axios.get(base_url + "/get_daily").then((res) => {
      setPost((prevState) => [
        ...prevState,
        ...res.data.sort(dynamicSort("-created_at")),
      ]);
      return res.data;
    });
  });

  const postQuery2 = useQuery("posts_tutorial", () => {
    return axios.get(base_url + "/get_tutorial").then((res) => {
      setPost((prevState) => [
        ...prevState,
        ...res.data.sort(dynamicSort("-created_at")),
      ]);
      return res.data;
    });
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
      <SEO title="Home" />
      <Center maxWidth="100vw">
        <Stack maxW="65%" className="blog-body">
          <Center className="bg-change" minH="20vh" borderRadius="xl" p="2">
            <Heading
              fontSize="3xl"
              textColor="white"
              fontWeight="bold"
              textAlign="center"
            >
              {config.blog_intro}
            </Heading>
          </Center>
          <br />
          <Center>
            <Stack spacing={"20px"}>
              <p className="subHeading">Latest Post</p>
              {postQuery.isLoading ||
                (postQuery2.isLoading && (
                  <Center>
                    <Spinner />
                  </Center>
                ))}
              {postQuery.isError || (!post && <Center>No posts yet...</Center>)}
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
              <p className="subHeading">About</p>
              <Box lineHeight="20px" whiteSpace="break-spaces" maxW="100%">
                <ReactMarkdown
                  children={markdown.text}
                  components={SyntaxHighlight}
                />
              </Box>
            </Stack>
          </Center>
          <Footer />
        </Stack>
      </Center>
    </>
  );
}
