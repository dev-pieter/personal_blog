import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import AppFrame from "../shared/components/AppFrame";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AppFrame>
        <Component {...pageProps} />
      </AppFrame>
    </ChakraProvider>
  );
}

export default MyApp;
