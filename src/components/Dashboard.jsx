import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ChatRoom from "./ChatRoom";
import Header from "./Header";

const Dashboard = ({ darkMode, setDarkMode }) => {
  const [chatrooms, setChatrooms] = useState([]);
  const [newChatroomName, setNewChatroomName] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatData, setChatData] = useState({});
  const [selectedChatroomId, setSelectedChatroomId] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth") || "{}");
    if (!authData?.verified) {
      navigate("/");
    } else {
      const storedChatrooms = JSON.parse(
        localStorage.getItem("chatrooms") || "[]"
      );
      setChatrooms(storedChatrooms);
      setCheckingAuth(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatData", JSON.stringify(chatData));
  }, [chatData]);
  useEffect(() => {
    const storedChatData = JSON.parse(localStorage.getItem("chatData") || "{}");
    setChatData(storedChatData);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatrooms", JSON.stringify(chatrooms));
  }, [chatrooms]);

  const handleCreateChatroom = () => {
    if (newChatroomName.trim()) {
      const newRoom = { id: Date.now(), name: newChatroomName }; // define newRoom first
      setChatrooms([...chatrooms, newRoom]);
      setSelectedChatroomId(newRoom.id); // now this will work fine

      toast.success(`Chatroom "${newChatroomName}" created!`);

      setNewChatroomName("");
    } else {
      toast.error("Please enter a chatroom name.");
    }
  };
  const handleDeleteChatroom = (id) => {
    const deletedRoom = chatrooms.find((room) => room.id === id);

    setChatrooms(chatrooms.filter((room) => room.id !== id));
    if (deletedRoom) {
      toast.info(`Chatroom "${deletedRoom.name}" deleted.`);
    }
  };

  const visibleChatrooms = searchQuery.trim()
    ? chatrooms.filter((room) =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chatrooms;

  return (
    <div
      className={`d-flex flex-column ${darkMode ? "bg-dark text-white" : ""}`}
      style={{ minHeight: "100vh" }}
    >
      {checkingAuth ? (
        <div className="container my-4 py-4">Checking authentication...</div>
      ) : (
        <>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="container my-4 py-4">
            <h3 className="display-4">Dashboard</h3>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search chatroom..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter chatroom name"
                value={newChatroomName}
                onChange={(e) => setNewChatroomName(e.target.value)}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleCreateChatroom}
              >
                Create Chatroom
              </button>
            </div>
            {visibleChatrooms.length > 0 ? (
              <ul className="list-group">
                {visibleChatrooms.map((room) => (
                  <li
                    key={room.id}
                    className={`list-group-item d-flex justify-content-between align-items-center ${
                      selectedChatroomId === room.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedChatroomId(room.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {room.name}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChatroom(room.id);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No chatrooms created yet.</p>
            )}
            <ChatRoom
              chatroomId={selectedChatroomId}
              darkMode={darkMode}
              chatData={chatData}
              setChatData={setChatData}
            />

            {/* <ChatRoom chatroomId={selectedChatroomId} darkMode={darkMode} /> */}
            {/* <ChatRoom /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
