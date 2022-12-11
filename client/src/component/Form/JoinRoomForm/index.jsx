import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({ socket, setUser, uuid }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom=(e)=>{
    e.preventDefault();
    const roomData={
      Name:name,
      roomId,
      userId:uuid(),
      host:false,
      presenter:false
    }
    setUser(roomData)
    navigate(`/${roomId}`)
    socket.emit("userJoined",roomData)
  }
  return (
    <form className="form mt-5 col-md-12">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter Your Name"
          value={name}
        onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter Room Code"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="mt-4 btn btn-primary btn-block form-control"
        onClick={handleJoinRoom}
      >
        Join Room
      </button>
    </form>
  );
};

export default JoinRoomForm;
