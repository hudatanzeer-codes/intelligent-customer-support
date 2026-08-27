import { useState } from "react";
import { createConversation } from "../services/chatApi";

function CustomerChat() {
  const [message, setMessage] = useState("");
  const [conversationStarted, setConversationStarted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! 👋 I'm your AI support assistant. How can I help you today?",
    },
  ]);

  const sendMessage = async () => {
    if (!message.trim() || isSending) return;

    setIsSending(true);
    setError("");

    try {
      // Create one backend conversation when the
      // customer sends their first message.
      if (!conversationStarted) {
        await createConversation();
        setConversationStarted(true);
      }

      const userMessage = message;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "user",
          text: userMessage,
        },
        {
          type: "bot",
          text: "Thanks for your question! I'm checking that for you.",
        },
      ]);

      setMessage("");
    } catch (err) {
      console.error("Chat error:", err);

      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError("Unable to start the conversation. Please try again.");
      }
    } finally {
      setIsSending(false);
    }
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

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <div className="chat-input">
          <input
            type="text"
            placeholder="Describe your problem..."
            value={message}
            disabled={isSending}
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
            disabled={isSending}
          >
            {isSending ? "Starting..." : "Send"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default CustomerChat;