import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Chat from "../../component/Chat";
import WhiteBoard from "../../component/WhiteBoard";
import "./index.css";

const RoomPage = ({ user, socket, users }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [openUserTab, setOpenUserTab] = useState(false);
  const [openChatTab, setOpenChatTab] = useState(false);

 

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect = "white";
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setElements([]);
  };

  const undo = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElements) =>
      prevElements.slice(0, prevElements.length - 1)
    );
  };
  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
  };

  return (
    <div className="row ">
      <button
        type="button"
        onClick={() => setOpenUserTab(true)}
        className="btn btn-dark"
        style={{
          display: "block",
          alignItems: "center",
          position: "absolute",
          top: "30px",
          left: "30px",
          height: "40px",
          width: "80px",
        }}
      >
        Users
      </button>
      <button
        type="button"
        onClick={() => setOpenChatTab(true)}
        className="btn btn-primary"
        style={{
          display: "block",
          alignItems: "center",
          position: "absolute",
          top: "30px",
          left: "130px",
          height: "40px",
          width: "80px",
        }}
      >
        Chats
      </button>
      {openUserTab && (
        <div
          className="position-fixed top-0  h-100 text-white bg-dark"
          style={{ width: "250px", left: "0%" }}
        >
          <button type="button" onClick={()=>setOpenUserTab(false)} className="btn btn-light btn-block w-100 mt-5">
            Close
          </button>

          <div className="d-flex flex-column gap-2">
            {users.map((usr) => (
              <div className="d-flex justify-content-between">
                <div className="d-flex gap-2">
                  <p
                    className="my-2 w-100 "
                    style={{
                      height: "3px",

                      margin: "7px",
                    }}
                  >
                    {usr.Name}
                    {user && user.userId === usr.userId && "(You)"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {
        openChatTab && <Chat setOpenChatTab={setOpenChatTab} socket={socket} />
        

      }
      <h1 className="text-center py-3">
        Drawing Board{" "}
        <span className="text-primary px-5">
          [Users Online : {users.length} ]
        </span>
      </h1>

      <div className="col-md-10 px-5 mx-auto  gap-5 mb-5 d-flex align-items-center justify-content-center">
        <div className="d-flex px-5 mx-auto col-md-2 justify-content-between gap-1">
          <div className="d-flex gap-1">
            <label htmlFor="pencil">Pencil</label>
            <input
              type="radio"
              id="pencil"
              name="tool"
              checked={tool === "pencil"}
              className="mt-1"
              value="pencil"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
          <div className="d-flex gap-1">
            <label htmlFor="line">Line</label>
            <input
              type="radio"
              id="line"
              name="tool"
              checked={tool === "line"}
              className="mt-1"
              value="line"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
          <div className="d-flex gap-1">
            <label htmlFor="rectangle">Rectangle</label>
            <input
              type="radio"
              id="rectangle"
              checked={tool === "rectangle"}
              name="tool"
              className="mt-1"
              value="rectangle"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-2  mx-auto">
          <div className="d-flex align-items-center">
            <label htmlFor="color">Select Color</label>
            <input
              type="color"
              className="mt-1 ms-3"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3 d-flex gap-2 ">
          <button
            className="btn btn-primary mt-1"
            disabled={elements.length === 0}
            onClick={undo}
          >
            Undo
          </button>
          <button
            className="btn btn-outline-primary mt-1"
            disabled={history.length < 1}
            onClick={redo}
          >
            Redo
          </button>
        </div>
        <div className="col-md-2">
          <button className="btn btn-danger" onClick={handleClearCanvas}>
            Clear Board
          </button>
        </div>
      </div>
      <div className="col-md-12 mx-auto">
        <WhiteBoard
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          color={color}
          tool={tool}
          user={user}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default RoomPage;
