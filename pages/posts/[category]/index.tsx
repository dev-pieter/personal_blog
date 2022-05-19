import { Stack, Text } from "@chakra-ui/react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  NextPageContext,
} from "next";
import { useRouter } from "next/router";
import React from "react";
import { ReadTimeResults } from "reading-time";
import PostCard from "../../../shared/components/BlogComponents/PostCard";
import { api } from "../../../shared/controllers/postController";
import { BlogArticleType } from "../../../shared/controllers/types";

interface Props {
  posts: BlogArticleType[];
  catagory: string;
}

const Index: NextPage<Props> = ({ posts, catagory }) => {
  const router = useRouter();
  return (
    <Stack>
      {posts.map((post) => (
        <PostCard
          history={router}
          postLink={`${catagory}/${post.slug}`}
          key={post.title}
          heading={post.title}
          url={post.imageUrl}
          renderIntroBody={() => <Text>{post.description}</Text>}
          readTime={`${(
            post.timeReading as unknown as ReadTimeResults
          ).minutes.toFixed(0)} min`}
          author={"Pieter Nortje"}
          date={post.date}
        />
      ))}
    </Stack>
  );
};

export const getServerSideProps = ({ params }: GetServerSidePropsContext) => {
  const category = params?.category;

  const posts: BlogArticleType[] = api.getArticlesByTag(category as string, [
    "title",
    "imageUrl",
    "content",
    "description",
    "timeReading",
    "date",
    "slug",
  ]);

  return {
    props: { posts, category },
  };
};

export default Index;
