const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const router = express.Router();

app.get("/", (req, res) => {
  res.send("Server Up and Running");
});

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(3000, () => {
  console.log("Server Running ");
});
