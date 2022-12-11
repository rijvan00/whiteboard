import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateRoomForm = ({ uuid, socket, setUser}) => {
  const [roomId, setRoomId] = useState(uuid());
  const [Name, setName] = useState("");
  const navigate = useNavigate();
  const handleCreateRoom=(e)=>{
    e.preventDefault();
    const roomData={
      Name,
      roomId,
      userId:uuid(),
      host:true,
      presenter:true
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
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group border">
        <div className="input-group d-glex align-items-center justify-content-center">
          <input
            type="text"
            value={roomId}
            className="form-control my-2 border-0"
            disabled
            placeholder="Generate Room Code"
          />
          <div className="input-group-aapend ">
            <button
              className="btn btn-primary btn-sm me-1"
              onClick={()=> setRoomId(uuid())}
              type="button"
            >
              Generate
            </button>
            <button
              className="btn btn-outline-danger btn-sm me-2"
              type="button"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 btn btn-primary btn-block form-control"
        onClick={handleCreateRoom}
      >
        Generate Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
