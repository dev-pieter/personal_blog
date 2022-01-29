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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Card } from "../../../components";
import { useState } from "react";
import { Link } from "react-router-dom";

const base_url = "https://api.devpieter.co.za";
// const base_url = 'http://172.17.37.190:3001'

export default function PostList(props) {
  const [view, setView] = useState("cards");
  const [posts, setPosts] = useState([]);
  const blogs = useQuery("posts_" + props.cat, () => {
    return axios.get(base_url + "/get_" + props.cat).then((res) => {
      // console.log(res)
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

  const calculateReadTime = (markdown) => {
    console.log(markdown)
    const chars = markdown.length

    return Math.floor(chars / 200 / 6);
  }

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
          <InputGroup>
            <InputLeftElement children={<SearchIcon />} />
            <Input variant="Outline" placeholder="Search" onChange={onSearch} />
          </InputGroup>
          {posts.map((item, key) => {
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
                      readTime={calculateReadTime(item.markdown) + ' min read' }
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
