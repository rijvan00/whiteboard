import React, { useState } from "react";
import { useEffect } from "react";

const Chat = ({ setOpenChatTab, socket }) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setchat(data.message)

    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message != "") {
      setChat((prevChats) => [...prevChats, { message}]);
      socket.emit("message", { message });

      setMessage("");
    }
  };

  return (
    <div
      className="position-fixed top-0  h-100 text-white bg-dark"
      style={{ width: "400px", left: "0%" }}
    >
      <button
        type="button"
        onClick={() => setOpenChatTab(false)}
        className="btn btn-light btn-block w-100 mt-5"
      >
        Close
      </button>

      <div
        className="d-flex flex-column gap-2 mt-4 border border-1 border-white rounded-3 p-1 overflow-hidden"
        style={{
          height: "77%",
        }}
      >
        {chat.map((msg, index) => (
          <p
            key={index}
            className="my-2 w-100 "
            style={{
              height: "3px",

              margin: "7px",
            }}
          >
            {msg.Name} : {msg.message}
          </p>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-100 d-flex  mt-4 border rounded-3"
      >
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Type your message"
          className="h-100 border-0 rounded-0 py-2 px-2 bg-dark text-white"
          style={{
            color: "white",
            width: "90%",
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-light border-0 rounded-0 bg-dark text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
