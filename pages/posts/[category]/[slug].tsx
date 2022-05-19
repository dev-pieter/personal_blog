import { Stack, Text } from "@chakra-ui/react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  NextPageContext,
} from "next";
import React from "react";
import PostBody from "../../../shared/components/BlogComponents/PostBody";
import PostCard from "../../../shared/components/BlogComponents/PostCard";
import { api } from "../../../shared/controllers/postController";
import { BlogArticleType } from "../../../shared/controllers/types";

interface Props {
  post: BlogArticleType;
}

const index: NextPage<Props> = ({ post }) => {
  return (
    <Stack>
      <PostBody title={post.title as string} content={post.content as string} />
    </Stack>
  );
};

export const getServerSideProps = ({ params }: GetServerSidePropsContext) => {
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

export default index;
