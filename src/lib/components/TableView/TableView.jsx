import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Edit } from "..";
import { Table, Thead, Tbody, Tr, Th, Td, Center } from "@chakra-ui/react";

const base_url = "https://api.devpieter.co.za";

export default function TableView({ children }) {
  const interval = 1000;

  const blogs_daily = useQuery(
    "posts_" + "daily",
    async () => {
      return axios.get(base_url + "/get_" + "daily").then((res) => {
        // console.log(res)
        return res.data;
      });
    },
    {
      refetchInterval: interval,
    }
  );

  const blogs_tutorial = useQuery(
    "posts_" + "tutorial",
    async () => {
      return axios.get(base_url + "/get_" + "tutorial").then((res) => {
        // console.log(res)
        return res.data;
      });
    },
    {
      refetchInterval: interval,
    }
  );

  if (blogs_daily.isLoading || blogs_tutorial.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Views</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td fontWeight="bold">DAILY</Td>
            <Td />
            <Td />
          </Tr>
          {blogs_daily.data.map((x) => (
            <Tr>
              <Td>{x.heading}</Td>
              <Td>{x.views || 0}</Td>
              <Td>
                <Edit post={x} />
              </Td>
            </Tr>
          ))}
          <Tr>
            <Td fontWeight="bold">TUTORIALS</Td>
            <Td />
            <Td />
          </Tr>
          {blogs_tutorial.data.map((x) => (
            <Tr>
              <Td>{x.heading}</Td>
              <Td>{x.views || 0}</Td>
              <Td>
                <Edit post={x} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Center pt="6">{children}</Center>
    </>
  );
}
