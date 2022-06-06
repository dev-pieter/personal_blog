import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlight from "./SyntaxHighlight";
import Link from "next/link";

import styles from "./postStyles.module.css";
import { useRouter } from "next/router";
import { FaGithub } from "react-icons/fa";

interface Props {
  title?: string;
  content: string;
  tags?: string[];
  imageUrl?: string;
  author?: string;
  date?: string;
  repoLink?: string;
}

const PostBody: FunctionComponent<Props> = ({
  title,
  content,
  tags,
  imageUrl,
  author,
  date,
  repoLink,
}): JSX.Element => {
  const router = useRouter();

  return (
    <Stack
      lineHeight="20px"
      whiteSpace="break-spaces"
      textAlign="justify"
      bg={"none"}
      border={`1px solid ${"white"}`}
      p={"20px"}
      spacing={"20px"}
      className={styles.blogBody}
      color={"gray.200"}
    >
      {title && <Heading color="white">{title}</Heading>}
      {author && (
        <Text color={"gray.400"}>
          {author} {date && `- ${date}`}
        </Text>
      )}
      {repoLink && (
        <HStack>
          <FaGithub />
          <Link href={repoLink} target="_blank">
            Repo link
          </Link>
        </HStack>
      )}
      {tags && (
        <HStack>
          {tags.map((tag) => (
            <Link key={`${tag}`} href={`/posts?tag=${tag}`}>
              {`#${tag}`}
            </Link>
          ))}
        </HStack>
      )}
      {imageUrl && (
        <Box border={"5px solid"} borderColor="orange" p={4}>
          <Center>
            <Image alt={title} src={imageUrl} width="150px" />
          </Center>
        </Box>
      )}
      <ReactMarkdown components={SyntaxHighlight as any}>
        {content}
      </ReactMarkdown>
    </Stack>
  );
};

export default PostBody;
