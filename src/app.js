const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const nunjucks = require("nunjucks");

const app = express();

app.use(express.static(__dirname + "/public"));

nunjucks.configure(__dirname + "/views", {
  express: app,
  noCache: true, // 👁 I'll set this to false after dev
});

app.use(
  cors({
    origin: "*",
    methods: "GET, POST",
    optionsSuccessStatus: 204,
  })
); // 👁 I'll configure this after dev
app.use(express.json());
app.use(routes);

module.exports = app;
