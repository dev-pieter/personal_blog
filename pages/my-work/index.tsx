import {
  Avatar,
  Box,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { FaGithub, FaGithubAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import PostBody from "../../shared/components/BlogComponents/PostBody";
import SEO from "../../shared/components/Seo";
import { ghApi, GHRepos, GHUser } from "../../shared/controllers/gitController";

interface Props {
  user: GHUser;
  repos: GHRepos[];
  readme: string;
}

const Index: NextPage<Props> = ({ user, repos, readme }) => {
  if (!user) {
    return <div>No GitHub user data</div>;
  }

  return (
    <>
      <SEO title="My Work" image={user.avatar_url}></SEO>
      <Stack border={"1px solid white"} padding="20px" gap={"20px"}>
        <HStack gap="25px">
          <Avatar
            name={user.login}
            src={user.avatar_url}
            size="xl"
            boxShadow={"0 0 5px black"}
          ></Avatar>
          <Stack>
            <Heading fontFamily={"monospace"}>{user.login}</Heading>
            <Text color={"gray.400"}>{user.location}</Text>
          </Stack>
          <Spacer />
        </HStack>
        <hr></hr>
        <PostBody content={readme} />
        <Stack gap="10px">
          <Heading fontSize={"xl"}>GitHub Repos</Heading>
          <SimpleGrid minChildWidth={{ base: "100%", md: "40%" }} gap="5px">
            {repos.map((repo) => (
              <HStack
                key={repo.id}
                border={"0.5px solid grey"}
                borderRadius="4px"
              >
                <Stack padding="10px">
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    fontWeight={"bold"}
                  >
                    {repo.full_name}
                  </Link>
                  <Text color={"gray.400"}>{repo.description}</Text>
                </Stack>
              </HStack>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </>
  );
};

export const getServerSideProps = async () => {
  const user = await ghApi.fetchGitHubUser();
  const repos = await ghApi.fetchGitHubUserRepos();
  const readme = await ghApi.fetchGitHubUserReadme();

  return {
    props: {
      user: user.data,
      repos: repos.data,
      readme: readme.data,
    },
  };
};

export default Index;
