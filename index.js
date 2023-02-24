const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const router = express.Router();

app.use((req, res, next) => {
  console.log("Incoming ");
  next();
});
app.use(express.json({ extended: false }));
app.use(cors());
PORT = process.env.PORT || 3006;
app.get("/", (req, res) => {
  res.send("Server Up and Running");
});

app.use("/auth", require("./routes/auth"));

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

io.on("connection", (socket) => {
  // ...
});

app.listen(PORT, () => {
  console.log("Server Running " + PORT);
});
