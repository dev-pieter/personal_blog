import { SearchIcon } from "@chakra-ui/icons";
import {
  Center,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { SyntaxHighlight } from "../../../components";
import { extractMetaData } from "../../../utlis/utils";

import { fetchPostsByCat } from "../../../../controllers/postController";
import { Card } from "../../../components";
import SEO from "../../../seo/seo";
import { calculateReadTime, dynamicSort } from "../../../utlis/utils";
import { withRouter } from "react-router-dom";
import { ColorContext } from "../../../../providers/ContextProvider";

const sorts = [
  { value: "-created_at", name: "↑ Post date" },
  { value: "-updated_at", name: "↑ Last updated" },
];

function PostList(props) {
  const darkMode = useContext(ColorContext);
  const [posts, setPosts] = useState([]);
  const [order, setOrder] = useState(sorts[1].value);

  const { isLoading, isError, data } = useQuery("posts_" + props.cat, () =>
    fetchPostsByCat(props.cat)
  );

  const onSearch = (e) => {
    const searchString = e.target.value;
    if (!searchString) {
      setPosts(data);
    } else {
      setPosts(data.filter((j) => j.heading.match(searchString)));
    }
  };

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Center>
        <Spinner color={darkMode ? "white" : "black"} />
      </Center>
    );
  }

  if (isError || posts.length === 0) {
    return (
      <Center color={darkMode ? "white" : "black"}>No posts yet...</Center>
    );
  }

  return (
    <Center>
      <SEO
        title="Posts"
        description={`Are you lost? Here you'll find some ${props.cat} posts to fill your cup with prime content.`}
        image={posts[0].img_url ?? ""}
      />
      <SimpleGrid columns={[1, 1, 1]} gap={"20px"}>
        <HStack>
          <InputGroup
            width={"70%"}
            border={`1px solid ${darkMode ? "white" : "black"}`}
            color={darkMode ? "white" : "black"}
          >
            <InputLeftElement children={<SearchIcon />} />
            <Input
              variant="Outline"
              placeholder="Search"
              onChange={onSearch}
              borderRadius={0}
              bg={darkMode ? "none" : "white"}
            />
          </InputGroup>
          <InputGroup
            width={"30%"}
            border={`1px solid ${darkMode ? "white" : "black"}`}
            color={darkMode ? "white" : "black"}
          >
            <Select
              borderRadius={0}
              border={"none"}
              onChange={(e) => setOrder(e.target.value)}
              variant="Outline"
              bg={darkMode ? "none" : "white"}
            >
              {sorts.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </InputGroup>
        </HStack>
        {posts.sort(dynamicSort(order)).map((item) => {
          if (item.markdown) {
            return (
              <div key={item.heading}>
                <Card
                  author={item.author}
                  heading={item.heading}
                  url={item.img_url}
                  views={item.views}
                  renderIntroBody={() => renderIntroBody(item)}
                  readTime={calculateReadTime(item.markdown) + " min read"}
                  date={new Date(item.created_at).toDateString()}
                  postLink={`/posts/${item._id}`}
                  history={props.history}
                ></Card>
              </div>
            );
          }
        })}
      </SimpleGrid>
    </Center>
  );
}

export default withRouter(PostList);

const renderIntroBody = (data) => {
  const [rawMeta, metaData] = extractMetaData(data.markdown);

  if (Object.keys(metaData).length === 0) {
    return (
      <ReactMarkdown
        children={data.markdown.substr(0, data.markdown.indexOf("\n"))}
        components={SyntaxHighlight}
      />
    );
  }

  data.markdown = data.markdown.replace(rawMeta[0], "");

  return (
    <ReactMarkdown
      children={data.markdown.content}
      components={SyntaxHighlight}
    />
  );
};
