import { useState } from "react";

const DUMMY_USER = { name: "Jane Mwangi", area: "Westlands" };

const INITIAL_MESSAGES = [
  { id: 1, name: "John Kamau", area: "Kibera", text: "Has anyone seen the food donation post in Kibera? Really helpful!", time: "09:12" },
  { id: 2, name: "Amina Hassan", area: "Eastleigh", text: "There is a clothing drive happening this Saturday near Eastleigh market.", time: "09:45" },
  { id: 3, name: "Peter Otieno", area: "Lang'ata", text: "Thank you to whoever claimed my food request. You really helped my family.", time: "10:03" },
];

const INITIAL_CONVERSATIONS = [
  { id: 1, with: "John Kamau", lastMessage: "I can bring the food tomorrow", time: "10:15", unread: 2, messages: [
    { from: "John Kamau", text: "Hi, I saw your help request", time: "10:10" },
    { from: "me", text: "Yes I still need help", time: "10:12" },
    { from: "John Kamau", text: "I can bring the food tomorrow", time: "10:15" },
  ]},
  { id: 2, with: "Amina Hassan", lastMessage: "Where exactly are you located?", time: "09:50", unread: 0, messages: [
    { from: "Amina Hassan", text: "Where exactly are you located?", time: "09:50" },
  ]},
];

function getTime() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;
}

function ChatPage() {
  const [activeTab, setActiveTab] = useState("public");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeConvo, setActiveConvo] = useState(null);
  const [privateInput, setPrivateInput] = useState("");

  const inputStyle = {
    backgroundColor: "#FEFAE0",
    border: "1px solid #DDA15E",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 14,
    color: "#1a1a1a",
    outline: "none",
  };

  function sendPublicMessage() {
    if (!input.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      name: DUMMY_USER.name,
      area: DUMMY_USER.area,
      text: input.trim(),
      time: getTime(),
    }]);
    setInput("");
  }

  function sendPrivateMessage() {
    if (!privateInput.trim() || !activeConvo) return;
    const updated = conversations.map((c) =>
      c.id === activeConvo.id
        ? {
            ...c,
            lastMessage: privateInput.trim(),
            time: getTime(),
            messages: [...c.messages, { from: "me", text: privateInput.trim(), time: getTime() }],
          }
        : c
    );
    setConversations(updated);
    setActiveConvo(updated.find((c) => c.id === activeConvo.id));
    setPrivateInput("");
  }

  function openConvo(convo) {
    setActiveConvo(convo);
    setConversations(conversations.map((c) =>
      c.id === convo.id ? { ...c, unread: 0 } : c
    ));
  }

  return (
    <div style={{ backgroundColor: "#FEFAE0" }} className="min-h-screen">

      {/* Header */}
      <div
        style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
        className="px-6 py-4 flex items-center justify-between"
      >
        <div>
          <h1 className="text-xl font-bold">Community Chat</h1>
          <p className="text-sm opacity-75">Talk openly with your neighbours</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setActiveTab("public"); setActiveConvo(null); }}
            style={{
              backgroundColor: activeTab === "public" ? "#FEFAE0" : "transparent",
              color: activeTab === "public" ? "#606C38" : "#FEFAE0",
              border: "1px solid #FEFAE0",
            }}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
          >
            Public Chat
          </button>
          <button
            onClick={() => setActiveTab("private")}
            style={{
              backgroundColor: activeTab === "private" ? "#FEFAE0" : "transparent",
              color: activeTab === "private" ? "#606C38" : "#FEFAE0",
              border: "1px solid #FEFAE0",
            }}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all relative"
          >
            Private Messages
            {conversations.some((c) => c.unread > 0) && (
              <span
                style={{ backgroundColor: "#BC6C25" }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center"
              >
                {conversations.reduce((a, c) => a + c.unread, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* PUBLIC CHAT */}
      {activeTab === "public" && (
        <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col" style={{ height: "calc(100vh - 140px)" }}>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-4 pr-1">
            {messages.map((msg) => {
              const isMe = msg.name === DUMMY_USER.name;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  {!isMe && (
                    <span style={{ color: "#BC6C25" }} className="text-xs font-semibold mb-1 px-1">
                      {msg.name} · {msg.area}
                    </span>
                  )}
                  <div
                    style={{
                      backgroundColor: isMe ? "#606C38" : "#fff",
                      color: isMe ? "#FEFAE0" : "#1a1a1a",
                      border: isMe ? "none" : "1px solid #DDA15E",
                      maxWidth: "70%",
                    }}
                    className="px-4 py-2 rounded-2xl text-sm"
                  >
                    {msg.text}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 px-1">{msg.time}</span>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="flex gap-3 items-center">
            <input
              style={{ ...inputStyle, flex: 1 }}
              type="text"
              placeholder="Say something to your community..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendPublicMessage()}
            />
            <button
              onClick={sendPublicMessage}
              style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
              className="px-5 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-all"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* PRIVATE MESSAGES */}
      {activeTab === "private" && (
        <div
          className="grid max-w-5xl mx-auto px-6 py-6 gap-4"
          style={{ gridTemplateColumns: "280px 1fr", height: "calc(100vh - 140px)" }}
        >

          {/* Sidebar — conversations list */}
          <div
            style={{ backgroundColor: "#fff", border: "1px solid #DDA15E" }}
            className="rounded-2xl overflow-y-auto"
          >
            <div
              style={{ borderBottom: "1px solid #DDA15E" }}
              className="px-4 py-3"
            >
              <h2 style={{ color: "#606C38" }} className="font-bold text-sm">
                Conversations
              </h2>
            </div>
            {conversations.map((convo) => (
              <div
                key={convo.id}
                onClick={() => openConvo(convo)}
                style={{
                  backgroundColor: activeConvo?.id === convo.id ? "#FEFAE0" : "#fff",
                  borderBottom: "1px solid #f0e8d8",
                  cursor: "pointer",
                }}
                className="px-4 py-3 hover:bg-amber-50 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span style={{ color: "#606C38" }} className="font-semibold text-sm">
                    {convo.with}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{convo.time}</span>
                    {convo.unread > 0 && (
                      <span
                        style={{ backgroundColor: "#BC6C25", color: "#fff" }}
                        className="text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                      >
                        {convo.unread}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 truncate">{convo.lastMessage}</p>
              </div>
            ))}
          </div>

          {/* Right — active conversation */}
          {activeConvo ? (
            <div
              style={{ backgroundColor: "#fff", border: "1px solid #DDA15E" }}
              className="rounded-2xl flex flex-col"
            >
              {/* Convo header */}
              <div
                style={{ borderBottom: "1px solid #DDA15E", backgroundColor: "#FEFAE0" }}
                className="px-5 py-3 rounded-t-2xl"
              >
                <h2 style={{ color: "#606C38" }} className="font-bold">
                  {activeConvo.with}
                </h2>
                <p className="text-xs text-gray-400">Private conversation</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
                {activeConvo.messages.map((msg, i) => {
                  const isMe = msg.from === "me";
                  return (
                    <div
                      key={i}
                      className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                    >
                      {!isMe && (
                        <span style={{ color: "#BC6C25" }} className="text-xs font-semibold mb-1 px-1">
                          {msg.from}
                        </span>
                      )}
                      <div
                        style={{
                          backgroundColor: isMe ? "#606C38" : "#FEFAE0",
                          color: isMe ? "#FEFAE0" : "#1a1a1a",
                          border: isMe ? "none" : "1px solid #DDA15E",
                          maxWidth: "70%",
                        }}
                        className="px-4 py-2 rounded-2xl text-sm"
                      >
                        {msg.text}
                      </div>
                      <span className="text-xs text-gray-400 mt-1 px-1">{msg.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Input */}
              <div
                style={{ borderTop: "1px solid #DDA15E" }}
                className="p-4 flex gap-3 items-center"
              >
                <input
                  style={{ ...inputStyle, flex: 1 }}
                  type="text"
                  placeholder={`Message ${activeConvo.with}...`}
                  value={privateInput}
                  onChange={(e) => setPrivateInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendPrivateMessage()}
                />
                <button
                  onClick={sendPrivateMessage}
                  style={{ backgroundColor: "#BC6C25", color: "#FEFAE0" }}
                  className="px-5 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-all"
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{ backgroundColor: "#fff", border: "1px dashed #DDA15E" }}
              className="rounded-2xl flex flex-col items-center justify-center text-center p-10"
            >
              <p style={{ color: "#606C38" }} className="text-lg font-bold mb-2">
                No conversation selected
              </p>
              <p className="text-sm text-gray-400">
                Click a conversation on the left to open it.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatPage;