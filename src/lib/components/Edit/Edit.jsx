import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
  Textarea,
  Stack,
  Select,
  HStack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";

// const base_url = "http://172.17.37.190:3001/"
const base_url = "https://api.devpieter.co.za/";

export default function Edit({ post }) {
  var toast = useToast();
  const token = sessionStorage.getItem("token");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const update = useMutation(async (obj) => {
    axios.post(base_url + "update_post", obj).then((res) => {
      toast({
        title: "Post updated successfully",
        status: "success",
      });
    });
  });

  const deletePost = useMutation(async (obj) => {
    axios.post(base_url + "delete_post", obj).then((res) => {
      console.log(post, res.data);
      toast({
        title: "Post deleted successfully",
        status: "success",
      });
    });
  });

  const handleChange = (e) => {
    e.preventDefault();

    const obj = {
      ...post,
      category: e.target[0].value,
      heading: e.target[1].value,
      img_url: e.target[2].value,
      markdown: e.target[3].value,
      token,
    };

    update.mutate(obj);
  };

  const onDelete = () => {
    const obj = {
      id: post._id,
      token,
    };

    deletePost.mutate(obj);
  };

  return (
    <>
      <HStack>
        <Button bg="white" onClick={onOpen}>
          edit
        </Button>
        <Button colorScheme="red" onClick={onDelete}>delete</Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleChange}>
              <Stack minW={"100%"}>
                <Text as="label">Category</Text>
                <Select
                  placeholder="Select category"
                  name="category"
                  defaultValue={post.category}
                >
                  <option value="daily">Daily</option>
                  <option value="tutorial">Tutorial</option>
                </Select>
                <Text as="label">Heading</Text>
                <Input
                  placeholder="Post heading"
                  defaultValue={post.heading}
                  name="heading"
                />
                <Text as="label">Image url</Text>
                <Input
                  placeholder="img url"
                  defaultValue={post.img_url}
                  name="img_url"
                />
                <Text as="label">Markdown text area</Text>
                <Textarea
                  minH={"600px"}
                  placeholder="markdown"
                  defaultValue={post.markdown}
                  name="markdown"
                />
                <Button bg="black" color="white" mr={3} type="submit">
                  Save
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
