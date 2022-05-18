const express = require("express");
const serveStatic = require("serve-static");
const app = express();
const fs = require("fs");
const resolve = require("path").resolve;

app.use(serveStatic(resolve("./build")));

app.get("/", (req, res) => res.sendFile(resolve("./build/index.html")));
app.get("/daily", (req, res) => res.sendFile(resolve("./build/daily.html")));
app.get("/tutorial", (req, res) =>
  res.sendFile(resolve("./build/tutorial.html"))
);
app.get("/posts/61ef9d5942aa17ed221faea4", (req, res) =>
  res.sendFile(resolve("./build/posts/61ef9d5942aa17ed221faea4.html"))
);
app.get("/admin", (req, res) => res.sendFile(resolve("./build/admin.html")));

app.listen(5000, () => console.log("Started on PORT 5000"));
