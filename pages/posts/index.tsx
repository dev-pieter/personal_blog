import {
  Badge,
  Center,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { ReadTimeResults } from "reading-time";

import { config } from "../../blog.config";
import PostCard from "../../shared/components/BlogComponents/PostCard";
import SEO from "../../shared/components/Seo";
import { api } from "../../shared/controllers/postController";
import { BlogArticleType } from "../../shared/controllers/types";
import styles from "./posts.module.css";

interface Props {
  posts: BlogArticleType[];
  allTagsFromCategory: string[];
  category?: string;
  queryTag?: string;
  categories?: string[];
  search?: string;
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Index: NextPage<Props> = ({
  posts,
  category,
  queryTag,
  allTagsFromCategory,
  categories,
  search,
}) => {
  const router = useRouter();

  const [searchString, setSearchString] = useState<string | null>(
    search ?? null
  );
  const [tagFilter, setTagFilter] = useState<string[]>(
    queryTag ? [queryTag] : category ? [category] : []
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
          <details className={styles.details}>
            <summary style={{ display: "block" }}>
              <Stack>
                <HStack>
                  <Heading fontFamily={"monospace"}>Posts</Heading>
                  <Spacer />
                  <HStack
                    cursor={"pointer"}
                    _hover={{ textDecoration: "underline", color: "orange" }}
                  >
                    <FiFilter />
                    <Text>Filters</Text>
                  </HStack>
                  <Text color={"gray.400"}>{tagFilter.length} active</Text>
                </HStack>
                <InputGroup border={"none"}>
                  <InputLeftElement>
                    <FaSearch />
                  </InputLeftElement>
                  <Input
                    borderRadius={"full"}
                    placeholder="Search Posts"
                    value={searchString ?? ""}
                    onChange={(value) =>
                      setSearchString(value.currentTarget.value)
                    }
                    variant="outline"
                  ></Input>
                </InputGroup>
              </Stack>
            </summary>
            <Stack padding={"10px"} gap="10px">
              <Text>Categories</Text>
              <SimpleGrid gap="5px">
                {categories?.map((tag) => (
                  <Badge
                    width={"180px"}
                    textAlign={"center"}
                    borderRadius={"full"}
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
              <Text>Tags</Text>
              <SimpleGrid minChildWidth={"150px"} gap="5px">
                {allTagsFromCategory.map((tag) => (
                  <Badge
                    textAlign={"center"}
                    borderRadius={"full"}
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
            </Stack>
          </details>
          <hr />
          {posts
            .filter((post) => {
              return tagFilter.length === 0
                ? true
                : (post.tags.concat(post.category as string) as string[]).some(
                    (item) => tagFilter.includes(item)
                  );
            })
            .filter((post) => {
              return searchString
                ? (post.title as string)
                    .toLowerCase()
                    .includes(searchString.toLowerCase())
                : true;
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
  const { category, tag, search } = query;

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

  const posts: BlogArticleType[] = api.getAllArticles(fields);

  let allTagsFromCategory: string[] = [];
  let categories: string[] = [];

  posts.map((post) => {
    if (post.category) {
      categories.push(post.category as string);
    }
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
      search: search ?? null,
      allTagsFromCategory,
      categories,
    },
  };
};

export default Index;
