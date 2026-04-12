import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I'm Amara — your Local Roots assistant. I'm here 24/7. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;
    const pageGreetings = {
      "/report": "I can help you fill in a report. What did you witness or experience?",
      "/help": "Are you looking for help, or do you want to offer support to someone?",
      "/chat": "Need help with translation between English and Swahili? Just ask.",
    };
    const greeting = pageGreetings[location.pathname];
    if (greeting && messages.length === 1) {
      setMessages((prev) => [...prev, { role: "assistant", content: greeting }]);
    }
  }, [isOpen]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        }
      );

      const data = await response.json();
      const reply = data.reply || "I could not process that. If this is an emergency call 999.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting. If this is an emergency, please call Kenya Police on 999 immediately.",
        },
      ]);
    }

    setLoading(false);
  }

  function isHighRisk(text) {
    const keywords = ["hitting", "beating", "locked", "weapon", "bleeding", "trapped", "scared", "hurt", "kill", "abuse", "help me", "danger"];
    return keywords.some((k) => text.toLowerCase().includes(k));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 24,
            width: 340,
            height: 480,
            backgroundColor: "#FEFAE0",
            border: "2px solid #DDA15E",
            borderRadius: 20,
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#606C38",
              borderRadius: "18px 18px 0 0",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "#DDA15E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#1a2e0a",
                  fontFamily: "Georgia, serif",
                }}
              >
                A
              </div>
              <div>
                <p style={{ color: "#FEFAE0", fontSize: 14, fontWeight: "bold", margin: 0, fontFamily: "Georgia, serif" }}>
                  Amara
                </p>
                <p style={{ color: "#DDA15E", fontSize: 10, margin: 0 }}>Available 24/7</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "none", border: "none", color: "#FEFAE0", fontSize: 20, cursor: "pointer" }}
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
              >
                <div
                  style={{
                    backgroundColor: msg.role === "user" ? "#606C38" : "#fff",
                    color: msg.role === "user" ? "#FEFAE0" : "#1a1a1a",
                    border: msg.role === "user" ? "none" : "1px solid #DDA15E",
                    borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    padding: "8px 12px",
                    maxWidth: "80%",
                    fontSize: 13,
                    lineHeight: 1.5,
                    fontFamily: "Calibri, sans-serif",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #DDA15E",
                    borderRadius: "16px 16px 16px 4px",
                    padding: "8px 14px",
                    fontSize: 18,
                    color: "#606C38",
                  }}
                >
                  ...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* High risk banner */}
          {isHighRisk(input) && (
            <div
              style={{
                backgroundColor: "#a44a4a",
                padding: "6px 12px",
                fontSize: 11,
                color: "#fff",
                textAlign: "center",
              }}
            >
              If this is an emergency — call 999 now
            </div>
          )}

          {/* Input */}
          <div
            style={{
              borderTop: "1px solid #DDA15E",
              padding: "10px 12px",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <input
              style={{
                flex: 1,
                backgroundColor: "#fff",
                border: "1px solid #DDA15E",
                borderRadius: 20,
                padding: "8px 12px",
                fontSize: 13,
                outline: "none",
                fontFamily: "Calibri, sans-serif",
              }}
              type="text"
              placeholder="Ask Amara anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                backgroundColor: "#606C38",
                color: "#FEFAE0",
                border: "none",
                borderRadius: "50%",
                width: 34,
                height: 34,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                opacity: loading || !input.trim() ? 0.6 : 1,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              &#8593;
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "#606C38",
          border: "3px solid #DDA15E",
          cursor: "pointer",
          zIndex: 100,
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#FEFAE0",
            fontSize: 22,
            fontWeight: "bold",
            fontFamily: "Georgia, serif",
          }}
        >
          {isOpen ? "×" : "A"}
        </span>
      </button>
    </>
  );
}

export default AIAssistant;