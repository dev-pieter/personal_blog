const React = require("react");
const ReactDOMServer = require("react-dom/server");
const express = require("express");
const { Helmet } = require("react-helmet");
const { QueryClient, QueryClientProvider } = require("react-query");
const { ReactQueryDevtools } = require("react-query/devtools");
const { ChakraProvider } = require("@chakra-ui/react");
const { theme } = require("../src/styles/theme");

import App from "../src/App";

const PORT = process.env.PORT || 3006;
const queryClient = new QueryClient();
const app = express();

app.get("/*", (req, res) => {
  const appString = ReactDOMServer.renderToString(<App />);
  const helmet = Helmet.renderStatic();

  const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">
          ${appString}
        </div>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});
