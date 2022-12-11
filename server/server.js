const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const { addUser, getUser, removeUser } = require("./utils/users");
const io = new Server(server);
const port = process.env.PORT || 5000;
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.setMaxListeners(0);

//routes
app.use("/", (req, res) => {
  res.send("Server is up and running");
});
let roomId, imageURL;
//socket io server starts listening
io.on("connection", (socket) => {
  socket.on("userJoined", (data) => {
    const { Name, userId, roomId, host, presenter } = data;
    socket.join(roomId);
    let users = addUser({
      Name,
      userId,
      roomId,
      host,
      presenter,
      socketId: socket.id,
    });
    socket.emit("userIsJoined", { success: true, users });
    socket.broadcast.to(roomId).emit("userJoinedMessageBroadcast", Name);
    io.to(roomId).emit("allUsers", { users });

    io.to(roomId).emit("WhiteBoardDataResponse", {
      imageURL: imageURL,
    });
  });

  socket.on("message", (data) => {
    const { message } = data;
    const user = getUser(socket.id);

    if (user) {
      io.to(user.roomId).emit("messageResponse", {
        message,
        Name: user.Name,
      });
    } else {
      console.log("user not found");
    }
  });

  socket.on("WhiteBoardData", (data) => {
    imageURL = data;
    socket.broadcast.to(roomId).emit("WhiteBoardDataResponse", {
      imageURL: data,
    });
  });

  io.on("disconnect", () => {
    const user = getUser(socket.id);

    if (user) {
      removeUser(socket.id);
      socket.to(roomId).emit("userLeftMessageBroadcast", user.Name);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
