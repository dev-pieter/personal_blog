import { useDisclosure } from '@chakra-ui/hooks';
import {
    Button,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useMutation } from 'react-query';

const base_url = "https://api.devpieter.co.za";

export default function AddPost() {
  var toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [data, setData] = useState({
    category: "",
    author: "Pieter Nortje",
    heading: "",
    img_url: "",
    markdown: "",
  });
  const [preview, setPreview] = useState(false);

  const submit = useMutation((post) => {
    axios
      .post(base_url + "/add_post", {
        post,
      })
      .then((res) => {
        console.log(res.data);
        toast({
          title: "Post added successfully",
          status: "success",
        });
        return res.data;
      });
  });

  const handleCat = (e) => {
    setData({
      ...data,
      category: e.target.value,
    });
  };

  const handleHead = (e) => {
    setData({
      ...data,
      heading: e.target.value,
    });
  };

  const handleUrl = (e) => {
    setData({
      ...data,
      img_url: e.target.value,
    });
  };

  const handleMarkdwn = (e) => {
    setData({
      ...data,
      markdown: e.target.value,
    });
  };

  const handleSubmit = () => {
    const d = data;

    submit.mutate(d);
  };

  return (
    <>
      <HStack>
        <Button bg="white" onClick={onOpen} borderRadius="full">
          +
        </Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text as="label">Category</Text>
              <Select placeholder="Select category" onChange={handleCat}>
                <option value="daily">Daily</option>
                <option value="tutorial">Tutorial</option>
              </Select>
              <Text as="label">Heading</Text>
              <Input placeholder="Post heading" onChange={handleHead} />
              <Text as="label">Image url</Text>
              <Input placeholder="img url" onChange={handleUrl} />
              <Text as="label">Markdown text area</Text>
              <div onClick={() => setPreview(data => (!data))}>preview</div>
              {preview ? (
                <ReactMarkdown children={data.markdown} />
              ) : (
                <Textarea
                  minH={"600px"}
                  placeholder="markdown"
                  value={data.markdown}
                  onChange={handleMarkdwn}
                />
              )}
              <Button onClick={handleSubmit}>Submit post</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
