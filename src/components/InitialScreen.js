import React, { useState, useEffect, useRef } from "react";
import "./InitialScreen.css";

const InitialScreen = ({ onContinue }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 🔹 Ref for chat area
  const chatAreaRef = useRef(null);

  // 🔹 Load saved messages
  useEffect(() => {
    const stored = localStorage.getItem("messages");
    if (stored) {
      setMessages(JSON.parse(stored));
      setShowInitialMessage(false);
    }
  }, []);

  // 🔹 Auto-scroll to bottom whenever messages update
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // 🔹 Handlers
  const handleSidebar = () => setIsMenuOpen((prev) => !prev);
  const handleExitSidebar = () => setIsMenuOpen(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (showInitialMessage) {
      setMessages([{ id: "1", text: "Hello! How can I help you today?", sender: "AI" }]);
      setShowInitialMessage(false);
    }

    const userMsg = { id: Date.now().toString(), text: input, sender: "User" };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    localStorage.setItem("messages", JSON.stringify(updated));

    // Send to backend
    const payload = { message: input, role: "Friend", character: "Funny" };
    setIsLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data?.message) {
        const aiMsg = { id: Date.now().toString(), text: data.message, sender: "AI" };
        const newMsgs = [...updated, aiMsg];
        setMessages(newMsgs);
        localStorage.setItem("messages", JSON.stringify(newMsgs));
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handleClearChat = () => {
    const starter = [{ id: "1", text: "Hello! How can I help you today?", sender: "AI" }];
    setMessages(starter);
    localStorage.removeItem("messages");
    if (chatAreaRef.current) chatAreaRef.current.scrollTop = 0; // scroll to top
  };

  const handleEditYourAI = () => {
    setShowLoginModal(true);
  };

  // 🔹 UI
  return (
    <div className="initial-screen">
      {/* 🔹 Top Bar */}
      <div className="top-bar">
        <button onClick={handleSidebar} className="menu-btn">☰</button>
        <h1 className="brand-name">MyAI</h1>
        <button className="getplus-btn" onClick={onContinue}>Getplus</button>
      </div>

      {/* 🔹 Sidebar */}
      {isMenuOpen && (
        <>
          <div className="sidebar-overlay" onClick={handleExitSidebar}></div>
          <div className="sidebar">
            <h2>MyAI</h2>
            <button onClick={handleEditYourAI}>Edit Your AI</button>
            <button>Help</button>
            <button onClick={handleClearChat}>Clear Chat</button>
          </div>
        </>
      )}

      {/* 🔹 Chat */}
      <div className="chat-area" ref={chatAreaRef}>
        {showInitialMessage ? (
          <p className="ai-message">Hello! How can I help you today?</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={msg.sender === "User" ? "user-message" : "ai-message"}
            >
              {msg.text}
              {msg.sender === "AI" && isLoading && <span className="loading">...</span>}
            </div>
          ))
        )}
      </div>

      {/* 🔹 Bottom Input */}
      <div className="input-barinput-bar">
        <button onClick={handleClearChat}>✖</button>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSendMessage}>➤</button>
      </div>

      {/* 🔹 Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p>You are not logged in. Please log in to edit your AI.</p>
            <button onClick={() => setShowLoginModal(false)}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InitialScreen;
