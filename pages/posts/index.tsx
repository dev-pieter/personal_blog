import { Center, Link, Spinner, Stack, Text } from "@chakra-ui/react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  NextPageContext,
} from "next";
import { useRouter } from "next/router";
import React from "react";
import { ReadTimeResults } from "reading-time";
import PostCard from "../../shared/components/BlogComponents/PostCard";
import { api } from "../../shared/controllers/postController";
import { BlogArticleType } from "../../shared/controllers/types";
import { config } from "../../blog.config";
import SEO from "../../shared/components/Seo";

interface Props {
  posts: BlogArticleType[];
  category: string;
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Index: NextPage<Props> = ({ posts, category }) => {
  const router = useRouter();

  return (
    <Stack>
      <SEO title={capitalizeFirstLetter(category)} />
      {!posts.length && (
        <Stack>
          <Center gap="10px">
            <Text>No posts yet. Please stand by</Text>
          </Center>
          <Center gap="5px">
            Have post ideas? Get in contact -
            <Link href={`mailto:${config.author_email}`}>
              {config.author_email}
            </Link>
          </Center>
        </Stack>
      )}
      {posts.map((post) => (
        <PostCard
          history={router}
          postLink={`posts/${post.slug}`}
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

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const category = query?.category;

  const posts: BlogArticleType[] = api.getArticlesByCategory(
    category as string,
    [
      "title",
      "imageUrl",
      "content",
      "description",
      "timeReading",
      "date",
      "slug",
      "category",
    ]
  );

  return {
    props: { posts, category },
  };
};

export default Index;
