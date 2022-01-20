import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()


ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient} >
        <ChakraProvider >
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </ChakraProvider>
      </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


