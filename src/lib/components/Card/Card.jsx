import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  HStack,
  Image,
  Kbd,
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";

export default function Card(props) {
  const IMAGE = props.url;

  return (
    <Center cursor={"pointer"}>
      <Box
        role={"group"}
        p={6}
        maxW={"100%"}
        minW={"100%"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        _hover={{
          borderLeft: "5px solid orange",
        }}
      >
        <SimpleGrid columns={[1, 1, 2]} spacing={"20px"} alignItems={"center"}>
          <Center>
            <Stack textAlign="left" spacing={6} h={"100%"}>
              <Text
                color={"gray.500"}
                fontSize={"sm"}
                textTransform={"uppercase"}
              >
                {props.author}
              </Text>
              <Heading
                fontFamily={"monospace"}
                textAlign={"left"}
                fontSize={"xl"}
                maxW={"350px"}
                fontWeight={500}
              >
                {props.heading}
              </Heading>
              <HStack>
                <Kbd>{props.date}</Kbd>
                <Kbd>{props.readTime}</Kbd>
              </HStack>
            </Stack>
          </Center>
          <Center>
            <Box
              rounded={"lg"}
              pos={"relative"}
              width={"200px"}
              height={"200px"}
              maxW={"100%"}
              _after={{
                transition: "all .3s ease",
                content: '""',
                w: "full",
                h: "full",
                pos: "absolute",
                top: 5,
                left: 0,
                backgroundImage: `url(${IMAGE})`,
                filter: "blur(15px)",
                zIndex: -1,
              }}
              _groupHover={{
                _after: {
                  filter: "blur(20px)",
                },
              }}
            >
              <Image
                rounded={"lg"}
                height={"100%"}
                width={"100%"}
                objectFit={"cover"}
                src={IMAGE}
              />
            </Box>
          </Center>
          <HStack
            position="absolute"
            right={6}
            top={6}
            spacing={"3"}
            color={"gray.400"}
          >
            <HStack spacing={"1"}>
              <Text fontSize="sm">{props.views || 0}</Text>
              <FaEye />
            </HStack>
          </HStack>
          {/* <Stack direction={'row'} align={'center'}>
                    <Text fontWeight={800} fontSize={'xl'}>
                    $57
                    </Text>
                    <Text textDecoration={'line-through'} color={'gray.600'}>
                    $199
                    </Text>
                </Stack> */}
        </SimpleGrid>
      </Box>
    </Center>
  );
}
