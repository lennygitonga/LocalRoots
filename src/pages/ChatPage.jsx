import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  addPublicMessage,
  sendPrivateMessage,
  markAsRead,
  setActiveConversation,
  setPublicMessages,
} from "../store/slices/chatSlice";
import { fetchPublicMessages, createMessage } from "../api";

function getTime() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
}

function ChatPage() {
  const dispatch = useDispatch();
  const { publicMessages, conversations, activeConversationId } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState("public");
  const [input, setInput] = useState("");
  const [privateInput, setPrivateInput] = useState("");

  const activeConvo = conversations.find((c) => c.id === activeConversationId);
  const totalUnread = conversations.reduce((a, c) => a + (c.unread || 0), 0);

  const inputStyle = {
    backgroundColor: "#FEFAE0",
    border: "1px solid #DDA15E",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 14,
    color: "#1a1a1a",
    outline: "none",
  };
  
useEffect(() => {
  async function loadMessages() {
    try {
      const data = await fetchPublicMessages();
      dispatch(setPublicMessages(data));
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  }

  // Load immediately on mount
  loadMessages();

  // Then poll every 5 seconds
  const interval = setInterval(loadMessages, 5000);

  // Clear interval when user leaves the page
  return () => clearInterval(interval);
}, []);

  // Auto open private tab if coming from help page
  useEffect(() => {
    if (activeConversationId) {
      setActiveTab("private");
    }
  }, [activeConversationId]);

  async function handleSendPublic() {
    if (!input.trim()) return;
    const msg = {
      type: "public",
      from: user?.name?.split("·")[0].trim() || "Me",
      area: user?.name?.split("·")[1]?.trim() || "",
      text: input.trim(),
      time: getTime(),
    };
    try {
      const saved = await createMessage(msg);
      dispatch(addPublicMessage({ ...saved, id: saved._id }));
    } catch {
      dispatch(addPublicMessage({ ...msg, id: Date.now() }));
    }
    setInput("");
  }

  function handleSendPrivate() {
    if (!privateInput.trim() || !activeConversationId) return;
    dispatch(sendPrivateMessage({
      conversationId: activeConversationId,
      message: { from: "me", text: privateInput.trim(), time: getTime() },
    }));
    setPrivateInput("");
  }

  function openConvo(convo) {
    dispatch(setActiveConversation(convo.id));
    dispatch(markAsRead(convo.id));
  }

  return (
    <div style={{ backgroundColor: "#FEFAE0" }} className="min-h-screen">

      <div style={{ backgroundColor: "#606C38", color: "#FEFAE0" }} className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Community Chat</h1>
          <p className="text-sm opacity-75">Talk openly with your neighbours</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("public")}
            style={{ backgroundColor: activeTab === "public" ? "#FEFAE0" : "transparent", color: activeTab === "public" ? "#606C38" : "#FEFAE0", border: "1px solid #FEFAE0" }}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
          >
            Public Chat
          </button>
          <button
            onClick={() => setActiveTab("private")}
            style={{ backgroundColor: activeTab === "private" ? "#FEFAE0" : "transparent", color: activeTab === "private" ? "#606C38" : "#FEFAE0", border: "1px solid #FEFAE0" }}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all relative"
          >
            Private Messages
            {totalUnread > 0 && (
              <span style={{ backgroundColor: "#BC6C25" }} className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold">
                {totalUnread}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === "public" && (
        <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col" style={{ height: "calc(100vh - 140px)" }}>
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-4 pr-1">
            {publicMessages.length === 0 ? (
              <div style={{ border: "1px dashed #DDA15E", color: "#888" }} className="rounded-2xl p-10 text-center mt-10">
                <p className="text-lg font-semibold">No messages yet</p>
                <p className="text-sm mt-2">Be the first to say something.</p>
              </div>
            ) : (
              publicMessages.map((msg, i) => {
                const isMe = msg.from === (user?.name?.split("·")[0].trim() || "Me");
                return (
                  <div key={msg._id || msg.id || i} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    {!isMe && <span style={{ color: "#BC6C25" }} className="text-xs font-semibold mb-1 px-1">{msg.from}{msg.area ? ` · ${msg.area}` : ""}</span>}
                    <div style={{ backgroundColor: isMe ? "#606C38" : "#fff", color: isMe ? "#FEFAE0" : "#1a1a1a", border: isMe ? "none" : "1px solid #DDA15E", maxWidth: "70%" }} className="px-4 py-2 rounded-2xl text-sm">
                      {msg.text}
                    </div>
                    <span className="text-xs text-gray-400 mt-1 px-1">{msg.time}</span>
                  </div>
                );
              })
            )}
          </div>
          <div className="flex gap-3 items-center">
            <input
              style={{ ...inputStyle, flex: 1 }}
              type="text"
              placeholder="Say something to your community..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendPublic()}
            />
            <button onClick={handleSendPublic} style={{ backgroundColor: "#606C38", color: "#FEFAE0" }} className="px-5 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-all">
              Send
            </button>
          </div>
        </div>
      )}

      {activeTab === "private" && (
        <div className="grid max-w-5xl mx-auto px-6 py-6 gap-4" style={{ gridTemplateColumns: "280px 1fr", height: "calc(100vh - 140px)" }}>
          <div style={{ backgroundColor: "#fff", border: "1px solid #DDA15E" }} className="rounded-2xl overflow-y-auto">
            <div style={{ borderBottom: "1px solid #DDA15E" }} className="px-4 py-3">
              <h2 style={{ color: "#606C38" }} className="font-bold text-sm">Conversations</h2>
            </div>
            {conversations.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-gray-400">No conversations yet.</p>
                <p className="text-xs text-gray-400 mt-1">Claim a help request to start one.</p>
              </div>
            ) : (
              conversations.map((convo) => (
                <div key={convo.id} onClick={() => openConvo(convo)} style={{ backgroundColor: activeConversationId === convo.id ? "#FEFAE0" : "#fff", borderBottom: "1px solid #f0e8d8", cursor: "pointer" }} className="px-4 py-3 hover:bg-amber-50 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ color: "#606C38" }} className="font-semibold text-sm">{convo.with}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{convo.time}</span>
                      {convo.unread > 0 && (
                        <span style={{ backgroundColor: "#BC6C25", color: "#fff" }} className="text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{convo.unread}</span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{convo.lastMessage}</p>
                  {convo.relatedRequest && <p style={{ color: "#DDA15E" }} className="text-xs mt-1 font-semibold truncate">Re: {convo.relatedRequest}</p>}
                </div>
              ))
            )}
          </div>

          {activeConvo ? (
            <div style={{ backgroundColor: "#fff", border: "1px solid #DDA15E" }} className="rounded-2xl flex flex-col">
              <div style={{ borderBottom: "1px solid #DDA15E", backgroundColor: "#FEFAE0" }} className="px-5 py-3 rounded-t-2xl">
                <h2 style={{ color: "#606C38" }} className="font-bold">{activeConvo.with}</h2>
                {activeConvo.relatedRequest && <p style={{ color: "#BC6C25" }} className="text-xs mt-0.5">Re: {activeConvo.relatedRequest}</p>}
              </div>
              <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
                {activeConvo.messages.map((msg, i) => {
                  const isMe = msg.from === "me";
                  return (
                    <div key={i} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                      {!isMe && <span style={{ color: "#BC6C25" }} className="text-xs font-semibold mb-1 px-1">{msg.from}</span>}
                      <div style={{ backgroundColor: isMe ? "#606C38" : "#FEFAE0", color: isMe ? "#FEFAE0" : "#1a1a1a", border: isMe ? "none" : "1px solid #DDA15E", maxWidth: "70%" }} className="px-4 py-2 rounded-2xl text-sm">
                        {msg.text}
                      </div>
                      <span className="text-xs text-gray-400 mt-1 px-1">{msg.time}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ borderTop: "1px solid #DDA15E" }} className="p-4 flex gap-3 items-center">
                <input style={{ ...inputStyle, flex: 1 }} type="text" placeholder={`Message ${activeConvo.with}...`} value={privateInput} onChange={(e) => setPrivateInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendPrivate()} />
                <button onClick={handleSendPrivate} style={{ backgroundColor: "#BC6C25", color: "#FEFAE0" }} className="px-5 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-all">Send</button>
              </div>
            </div>
          ) : (
            <div style={{ backgroundColor: "#fff", border: "1px dashed #DDA15E" }} className="rounded-2xl flex flex-col items-center justify-center text-center p-10">
              <p style={{ color: "#606C38" }} className="text-lg font-bold mb-2">No conversation selected</p>
              <p className="text-sm text-gray-400">Click a conversation on the left to open it.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatPage;