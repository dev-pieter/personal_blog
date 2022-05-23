import { Center, Heading, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaAd, FaCode, FaPage4 } from "react-icons/fa";
import { ReadTimeResults } from "reading-time";

import { config } from "../blog.config";
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
        <Stack spacing={"20px"}>
          <Heading fontFamily={"monospace"}>What To Expect...</Heading>
          <hr />
          <Center>
            <Stack spacing={"20px"}>
              <PostBody content={post.content as string}></PostBody>
              <HStack>
                <Heading fontFamily={"monospace"}>Latest Post</Heading>
                <Spacer />
                <HStack
                  _hover={{ color: "orange", textDecoration: "underline" }}
                >
                  <Link
                    href={
                      config.blog_categories.find((item) =>
                        item.path.includes("posts")
                      )?.path ?? "/"
                    }
                  >
                    Browse all
                  </Link>
                  <FaCode />
                </HStack>
              </HStack>
              <hr />
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
