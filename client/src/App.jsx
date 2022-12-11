import React from "react";
import Forms from "./component/Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoomPage from "./pages/RoomPage";
import io from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
const server = "http://localhost:5000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  reconnectionDelay: 10000,
  transports: ["websocket"],
};
const socket = io(server, connectionOptions);

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if (data.success) {
        setUsers(data.users);
      } else {
        alert("UserJoined failed");
      }
    });
    socket.on("allUsers", (data) => {
      setUsers(data.users);
    });

    socket.on("userJoinedMessageBroadcast", (data) => {
      toast.info(`${data} joined the room`);
    });
    socket.on("userLeftMessageBroadcast", (data) => {
      toast.info(`${data} left the room`);
    });
  }, []);

  const uuid = () => {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  return (
    <div className="container">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Forms uuid={uuid} socket={socket} setUser={setUser} />}
          />
          <Route
            exact
            path="/:roomId"
            element={<RoomPage user={user} socket={socket} users={users} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
