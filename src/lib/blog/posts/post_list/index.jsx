import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import {
  Center,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  HStack,
  Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Card } from "../../../components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { dynamicSort, calculateReadTime } from "../../../utlis/utils";
import { config } from "../../../../blog.config";

const base_url = config.blog_api_url;

const sorts = [
  { value: "-created_at", name: "↑ Post date" },
  { value: "-updated_at", name: "↑ Last updated" },
];

export default function PostList(props) {
  const [view, setView] = useState("cards");
  const [posts, setPosts] = useState([]);
  const [order, setOrder] = useState(sorts[1].value);

  const blogs = useQuery("posts_" + props.cat, () => {
    return axios.get(base_url + "/get_" + props.cat).then((res) => {
      setPosts(res.data);
      return res.data;
    });
  });

  const onSearch = (e) => {
    const searchString = e.target.value;
    if (!searchString) {
      setPosts(blogs.data);
    } else {
      setPosts(blogs.data.filter((j) => j.heading.match(searchString)));
    }
  };

  if (blogs.isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (blogs.isError || blogs.data.length === 0) {
    return <Center>No posts yet...</Center>;
  }

  if (view === "cards") {
    return (
      <Center minW="100%">
        <SimpleGrid columns={[1, 1, 1]} gap={"20px"} minW="70%">
          <HStack>
            <InputGroup width={"80%"}>
              <InputLeftElement children={<SearchIcon />} />
              <Input
                variant="Outline"
                placeholder="Search"
                onChange={onSearch}
              />
            </InputGroup>
            <Select width={"20%"} onChange={(e) => setOrder(e.target.value)}>
              {sorts.map((item) => (
                <option value={item.value}>{item.name}</option>
              ))}
            </Select>
          </HStack>
          {posts.sort(dynamicSort(order)).map((item, key) => {
            if (item.markdown) {
              return (
                <div>
                  <Link to={`/posts/${item._id}`}>
                    <Card
                      key={key}
                      author={item.author}
                      heading={item.heading}
                      url={item.img_url}
                      views={item.views}
                      readTime={calculateReadTime(item.markdown) + " min read"}
                      date={new Date(item.created_at).toDateString()}
                    ></Card>
                  </Link>
                </div>
              );
            }
          })}
        </SimpleGrid>
      </Center>
    );
  }
}
