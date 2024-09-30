import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users: JoinRoomDto[] = [];

type JoinRoomDto = {
  username: string;
  roomId: string;
};

// create handshake
io.on("connection", (socket) => {
  console.log("user is connected!..");

  // join
  socket.on("join", (req: JoinRoomDto) => {
    console.log("user joined", req.username);
    // push new user if not exist
    if (!users.find((user: JoinRoomDto) => user.username === req.username)) {
      users.push(req);
      socket.emit("join", users);
      socket.broadcast.emit("join", users);
    } else {
      socket.emit("userExist");
    }
  });

  // on message
  socket.on("message", (data) => {
    socket.emit("message", {
      message: `${data.username}:${data.text}`,
    });
    socket.broadcast.emit("message", {
      message: `${data.username}:   ${data.text}`,
    });
  });

  // disconnect
  socket.on("leave", (username) => {
    console.log("user disconnected", username);
    users.splice(users.indexOf(username), 1);
    socket.broadcast.emit("leave", users);
  });
});

io.on("disconnect", (socket) => {
  console.log("user disconnected");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server listening to port ${PORT}....`);
});
