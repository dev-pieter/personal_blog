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
  Link,
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";

export default function Card(props) {
  const IMAGE = props.url;

  return (
    <Center cursor={"pointer"} pb={6}>
      <Stack>
        <Box display={"flex"} gap={"30px"} alignItems={"center"}>
          <Center width={{ base: "100%", md: "70%" }}>
            <Stack textAlign="left" spacing={3} h={"100%"}>
              <Heading
                fontFamily={"monospace"}
                textAlign={"left"}
                fontSize={"xl"}
                fontWeight={500}
                color={"black"}
              >
                {props.heading}
              </Heading>
              <Text
                color={"gray.500"}
                fontSize={"sm"}
                textTransform={"capitalize"}
              >
                {props.author}
              </Text>
              <HStack fontSize={"xs"}>
                <Box
                  borderRadius={"4px"}
                  padding={"3px 6px"}
                  bg={"gray.600"}
                  color={"white"}
                >
                  {props.date}
                </Box>
                <Box
                  borderRadius={"4px"}
                  padding={"3px 6px"}
                  bg={"gray.600"}
                  color={"white"}
                >
                  {props.readTime}
                </Box>
              </HStack>
            </Stack>
          </Center>
          <Center className="card-image" width={"30%"}>
            <Box
              rounded={"lg"}
              pos={"relative"}
              width={"130px"}
              height={"130px"}
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
                objectFit={"contain"}
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
        </Box>
        <Box textAlign={"justify"} color={"gray.500"} pt={3}>
          {props.renderIntroBody && (
            <>
              {props.renderIntroBody()}
              <Link textDecoration={"underline"}>Read more</Link>
            </>
          )}
        </Box>
      </Stack>
    </Center>
  );
}
