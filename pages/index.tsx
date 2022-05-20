import { Box, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { ReadTimeResults } from "reading-time";

import PostBody from "../shared/components/BlogComponents/PostBody";
import PostCard from "../shared/components/BlogComponents/PostCard";
import SEO from "../shared/components/Seo";
import { api } from "../shared/controllers/postController";
import { BlogArticleType } from "../shared/controllers/types";

export interface Props {
  post: BlogArticleType;
  latestPosts: BlogArticleType[];
}

const Blog: NextPage<Props> = ({ post, latestPosts }) => {
  const router = useRouter();
  return (
    <>
      <SEO
        title={post.title as string}
        description={post.description as string}
      />
      <Center>
        <Stack>
          <Center>
            <Stack spacing={"20px"} color={"black"}>
              <PostBody content={post.content as string}></PostBody>
              <Text fontSize={"20px"} color="white" fontWeight={"bold"}>
                Latest Post
              </Text>
              <PostCard
                history={router}
                postLink={`posts/${latestPosts[0].slug}`}
                heading={latestPosts[0].title}
                url={latestPosts[0].imageUrl}
                renderIntroBody={() => (
                  <Text>{latestPosts[0].description}</Text>
                )}
                readTime={`${
                  (latestPosts[0].timeReading as unknown as ReadTimeResults)
                    .minutes
                } min`}
                author={"Pieter Nortje"}
                date={latestPosts[0].date}
              ></PostCard>
            </Stack>
          </Center>
        </Stack>
      </Center>
    </>
  );
};

export const getStaticProps = () => {
  const post = api.getArticleBySlug("home", [
    "content",
    "title",
    "description",
  ]);
  const latestPosts = api.getAllArticles([
    "content",
    "title",
    "description",
    "imageUrl",
    "timeReading",
    "date",
    "slug",
    "tags",
  ]);

  return {
    props: { post, latestPosts },
  };
};

export default Blog;
