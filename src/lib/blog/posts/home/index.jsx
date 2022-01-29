import { Box, Center, Heading, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axios from "axios";

import { Card, Footer } from "../../../components";
import { dynamicSort, calculateReadTime } from "../../../utlis/utils";
import HomePost from "./home.md";

const base_url = "https://api.devpieter.co.za";

export default function Blog() {
  const [post, setPost] = useState();
  const [markdown, setMarkdown] = useState({
    text: "",
  });

  const postQuery = useQuery("posts_daily", () => {
    return axios.get(base_url + "/get_daily").then((res) => {
      setPost(res.data.sort(dynamicSort("-created_at"))[0]);
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
            <Stack spacing={'20px'}>
              <p style={{fontWeight: 'bold'}}>Latest post:</p>
              {post && (
                <Link to={`/posts/${post._id}`}>
                  <Card
                    author={post.author}
                    heading={post.heading}
                    url={post.img_url}
                    views={post.views}
                    readTime={calculateReadTime(post.markdown) + " min read"}
                    date={new Date(post.created_at).toDateString()}
                  ></Card>
                </Link>
              )}
              <p style={{fontWeight: 'bold'}}>About:</p>
              <Box lineHeight="20px" whiteSpace="break-spaces" maxW="100%">
                <ReactMarkdown>{markdown.text}</ReactMarkdown>
              </Box>
            </Stack>
          </Center>
          <Footer />
        </Stack>
      </Center>
    </>
  );
}
