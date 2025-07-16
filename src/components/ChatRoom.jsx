import React, { useEffect, useRef, useState } from "react";

const ChatRoom = ({ chatroomId, darkMode, chatData, setChatData }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);

  useEffect(() => {
    if (chatroomId && chatData[chatroomId]) {
      setMessages(chatData[chatroomId]);
    } else {
      setMessages([]);
    }
  }, [chatroomId, chatData]);

  useEffect(() => {
    if (chatroomId) {
      setChatData({ ...chatData, [chatroomId]: messages });
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      content: inputMessage,
      imageUrl: null,

      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    triggerAIReply();
  };

  //handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageMessage = {
        id: Date.now(),
        sender: "user",
        content: "",
        imageUrl: reader.result, // Base64 image
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, imageMessage]);
    };
    reader.readAsDataURL(file);
  };

  const triggerAIReply = () => {
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        sender: "gemini",
        content: "This is a simulated AI reply.",
        imageUrl: null,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chatroomId) {
    return <p>Please select a chatroom to start chatting.</p>;
  }

  return (
    <div className={`container my-4 ${darkMode ? "text-white" : "text-dark"}`}>
      <h3>Chatroom ID: {chatroomId}</h3>

      <div
        className={`chat-box border rounded p-3 mb-3 ${
          darkMode ? "bg-dark" : "bg-white"
        }`}
        style={{ height: "400px", overflowY: "auto" }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 position-relative ${
              msg.sender === "user" ? "text-end" : "text-start"
            }`}
            style={{ position: "relative" }}
          >
            <div
              className={`p-2 rounded d-inline-block position-relative ${
                msg.sender === "user"
                  ? "bg-primary text-white"
                  : darkMode
                  ? "bg-secondary text-white"
                  : "bg-light text-dark"
              }`}
              onMouseEnter={() => setHoveredMessageId(msg.id)}
              onMouseLeave={() => setHoveredMessageId(null)}
            >
              {msg.imageUrl ? (
                <img
                  src={msg.imageUrl}
                  alt="uploaded"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              ) : (
                msg.content
              )}

              {hoveredMessageId === msg.id && !msg.imageUrl && (
                <button
                  className="btn btn-sm btn-light position-absolute"
                  style={{
                    top: "5px",
                    right: msg.sender === "user" ? "5px" : "auto",
                    left: msg.sender !== "user" ? "5px" : "auto",
                    fontSize: "12px",
                    padding: "2px 5px",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(msg.content);
                    toast.success("Message copied!");
                  }}
                >
                  Copy
                </button>
              )}
            </div>
            <small className={darkMode ? "text-light" : "text-muted"}>
              {msg.timestamp}
            </small>
          </div>
        ))}

        {isTyping && (
          <div className={darkMode ? "text-light" : "text-muted"}>
            Gemini is typing...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="input-group">
        <input
          type="text"
          className={`form-control ${
            darkMode ? "bg-dark text-white border-secondary" : ""
          }`}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button className="btn btn-success" onClick={handleSend}>
          Send
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default ChatRoom;

{
  /* {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 ${
              msg.sender === "user" ? "text-end" : "text-start"
            }`}
          >
            <div
              className={`p-2 rounded ${
                msg.sender === "user"
                  ? "bg-primary text-white"
                  : darkMode
                  ? "bg-secondary text-white"
                  : "bg-light text-dark"
              }`}
            >
              {msg.imageUrl ? (
                <img
                  src={msg.imageUrl}
                  alt="uploaded"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              ) : (
                msg.content
              )}
            </div>
            <small className={darkMode ? "text-light" : "text-muted"}>
              {msg.timestamp}
            </small>
          </div>
        ))} */
}
