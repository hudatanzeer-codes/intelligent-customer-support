import { useState } from "react";

function CustomerChat() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! 👋 I'm your AI support assistant. How can I help you today?",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        type: "user",
        text: message,
      },
      {
        type: "bot",
        text: "Thanks for your question! I'm checking that for you.",
      },
    ]);

    setMessage("");
  };

  return (
    <div className="page">
      <div className="chat-container">

        <div className="chat-header">
          <h1>Customer Support</h1>
          <p>Ask anything and our AI assistant will help you.</p>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.type}`}
            >
              <div className="message-bubble">
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Describe your problem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            className="primary-btn"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default CustomerChat;