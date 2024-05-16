import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this to allow connections from your frontend URL
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.emit("id", socket.id);

  socket.on("Message", ({sendMessage,id}) => {
    console.log(sendMessage)
    socket.emit("receive", sendMessage);
  });
});

server.listen(8000, () => {
  console.log("Web server listening on port http://localhost:8000");
});
