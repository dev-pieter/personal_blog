import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "gray.400",
        color: "black",
      },
      // styles for the `a`
      a: {
        color: "orange.400",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

export default theme;
