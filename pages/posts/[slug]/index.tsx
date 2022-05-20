import { Stack } from "@chakra-ui/react";
import { GetStaticPropsContext, NextPage } from "next";
import React from "react";

import PostBody from "../../../shared/components/BlogComponents/PostBody";
import SEO from "../../../shared/components/Seo";
import { api } from "../../../shared/controllers/postController";
import { BlogArticleType } from "../../../shared/controllers/types";

interface Props {
  post: BlogArticleType;
}

const index: NextPage<Props> = ({ post }) => {
  return (
    <Stack>
      <SEO
        title={post.title as string}
        description={post.description as string}
        image={post.imageUrl as string}
      />
      <PostBody
        title={post.title as string}
        content={post.content as string}
        imageUrl={post.imageUrl as string}
      />
    </Stack>
  );
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const slug = params?.slug;

  const post: BlogArticleType = api.getArticleBySlug(slug as string, [
    "title",
    "imageUrl",
    "content",
    "description",
    "timeReading",
    "date",
  ]);

  return {
    props: { post },
  };
};

export const getStaticPaths = async () => {
  const posts: BlogArticleType[] = api.getAllArticles(["slug"]);
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export default index;
