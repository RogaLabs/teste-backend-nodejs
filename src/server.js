const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const nunjucks = require("nunjucks");

const server = express();

server.use(
  cors({
    origin: "*",
    methods: "GET, POST",
    optionsSuccessStatus: 204,
  })
); // 👁 I'll configure this after dev

server.use(express.static(__dirname + "/public"));

nunjucks.configure(__dirname + "/views", {
  express: server,
  noCache: true, // 👁 I'll set this to false after dev
});

server.use(express.json());
server.use(routes);

server.listen(3333);
console.log(`👁  SERVER ♦ ••RUNNING•• ♦ PID: ${process.pid} ♦`);
