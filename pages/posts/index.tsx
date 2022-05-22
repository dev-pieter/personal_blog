import {
  Badge,
  Center,
  HStack,
  Link,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ReadTimeResults } from "reading-time";

import { config } from "../../blog.config";
import PostCard from "../../shared/components/BlogComponents/PostCard";
import SEO from "../../shared/components/Seo";
import { api } from "../../shared/controllers/postController";
import { BlogArticleType } from "../../shared/controllers/types";

interface Props {
  posts: BlogArticleType[];
  allTagsFromCategory: string[];
  category?: string;
  queryTag?: string;
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Index: NextPage<Props> = ({
  posts,
  category,
  queryTag,
  allTagsFromCategory,
}) => {
  const router = useRouter();
  const [tagFilter, setTagFilter] = useState<string[]>(
    queryTag ? [queryTag] : []
  );

  const toggleTagOnFilter = (tag: string) => {
    setTagFilter((prevState) => {
      if (!prevState.includes(tag)) {
        return [...prevState, tag];
      } else {
        return [...prevState.filter((stateTag) => tag !== stateTag)];
      }
    });
  };

  return (
    <Stack spacing={"20px"}>
      <SEO title={capitalizeFirstLetter(category || queryTag || "Posts")} />
      {!posts.length ? (
        <Stack>
          <Center textAlign={"center"}>
            <Stack gap="5px">
              <Text>No posts yet. Please stand by</Text>
              Have post ideas? Get in contact -
              <Link href={`mailto:${config.author_email}`} color={"orange"}>
                {config.author_email}
              </Link>
            </Stack>
          </Center>
        </Stack>
      ) : (
        <>
          <Text>Filter by tag</Text>
          <SimpleGrid minChildWidth={"150px"} gap="5px">
            {allTagsFromCategory.map((tag) => (
              <Badge
                title={tag}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                cursor={"pointer"}
                onClick={() => toggleTagOnFilter(tag)}
                key={tag}
                variant={tagFilter.includes(tag) ? "solid" : "outline"}
                color={"white"}
                p="6px 12px"
              >
                {tag}
              </Badge>
            ))}
          </SimpleGrid>
          <hr />
          {posts
            .filter((post) => {
              return tagFilter.length === 0
                ? true
                : (post.tags as string[]).some((item) =>
                    tagFilter.includes(item)
                  );
            })
            .map((post) => (
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
        </>
      )}
    </Stack>
  );
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { category, tag } = query;

  const fields = [
    "title",
    "imageUrl",
    "content",
    "description",
    "timeReading",
    "date",
    "slug",
    "category",
    "tags",
  ];

  const posts: BlogArticleType[] = category
    ? api.getArticlesByCategory(category as string, fields)
    : api.getAllArticles(fields);

  let allTagsFromCategory: string[] = [];

  posts.map((post) => {
    allTagsFromCategory = [
      ...(Array.from(
        new Set((post.tags as string[]).concat(allTagsFromCategory))
      ) as string[]),
    ];
  });

  return {
    props: {
      posts,
      category: category ?? null,
      queryTag: tag ?? null,
      allTagsFromCategory,
    },
  };
};

export default Index;
