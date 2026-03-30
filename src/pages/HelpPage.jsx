import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRequest, claimRequest, deleteRequest } from "../store/slices/helpSlice";
import { startConversation } from "../store/slices/chatSlice";

function HelpPage() {
  const [activeTab, setActiveTab] = useState("need");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requests = useSelector((state) => state.help);

  const categories = ["Food", "Clothing", "Shelter", "Water", "Medicine"];

  const inputStyle = {
    backgroundColor: "#FEFAE0",
    border: "1px solid #DDA15E",
    borderRadius: 8,
    padding: "10px 14px",
    width: "100%",
    fontSize: 14,
    color: "#1a1a1a",
    outline: "none",
  };

  function isExpired(expiryDate) {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  }

  function handleSubmit() {
    if (!category || !description || !location) {
      alert("Please fill in all required fields.");
      return;
    }

    const newRequest = {
      id: Date.now(),
      category,
      description,
      location,
      name: name || "Anonymous",
      date: new Date().toLocaleDateString(),
      expiryDate: expiryDate || null,
      status: "Needs Help",
      claimed: false,
    };

    dispatch(addRequest(newRequest));
    setCategory("");
    setDescription("");
    setLocation("");
    setName("");
    setExpiryDate("");
  }

  function handleClaim(item) {
    dispatch(claimRequest({
      id: item.id,
      claimedBy: "Me",
    }));

    dispatch(startConversation({
      id: `conv_${item.id}`,
      with: item.name,
      relatedRequest: `${item.category} · ${item.location}`,
      lastMessage: "I can help with your request",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      unread: 1,
      messages: [
        {
          from: "me",
          text: `Hi ${item.name}, I saw your ${item.category} request in ${item.location}. I can help — let's coordinate here.`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    }));

    navigate("/chat");
  }

  function handleDelete(id) {
    dispatch(deleteRequest(id));
  }

  function getCategoryColor(cat) {
    const colors = {
      Food: "#606C38",
      Clothing: "#BC6C25",
      Shelter: "#DDA15E",
      Water: "#4a90a4",
      Medicine: "#a44a4a",
    };
    return colors[cat] || "#888";
  }

  const filteredRequests = requests
    .filter((r) => {
      if (activeTab === "offer") return !r.claimed && !isExpired(r.expiryDate);
      return true;
    })
    .filter((r) =>
      filterCategory === "All" ? true : r.category === filterCategory
    );

  return (
    <div style={{ backgroundColor: "#FEFAE0" }} className="min-h-screen px-6 py-10">

      <h1
        style={{ color: "#606C38" }}
        className="text-3xl font-bold mb-2 text-center"
      >
        Community Help Board
      </h1>
      <p className="text-center text-gray-500 text-sm mb-8">
        Post a need or offer support to someone in your community.
      </p>

      {/* TABS */}
      <div className="flex justify-center mb-8">
        <div
          style={{ backgroundColor: "#fff", border: "1px solid #DDA15E" }}
          className="flex rounded-full p-1 gap-1"
        >
          <button
            onClick={() => setActiveTab("need")}
            style={{
              backgroundColor: activeTab === "need" ? "#606C38" : "transparent",
              color: activeTab === "need" ? "#FEFAE0" : "#606C38",
            }}
            className="px-6 py-2 rounded-full text-sm font-semibold transition-all"
          >
            I Need Help
          </button>
          <button
            onClick={() => setActiveTab("offer")}
            style={{
              backgroundColor: activeTab === "offer" ? "#BC6C25" : "transparent",
              color: activeTab === "offer" ? "#FEFAE0" : "#BC6C25",
            }}
            className="px-6 py-2 rounded-full text-sm font-semibold transition-all"
          >
            I Want to Help
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">

        {/* LEFT */}
        {activeTab === "need" ? (
          <div
            style={{ backgroundColor: "#fff", border: "1px solid #DDA15E" }}
            className="rounded-2xl p-6 h-fit"
          >
            <h2
              style={{ color: "#606C38" }}
              className="text-xl font-bold mb-6"
            >
              Post a Need
            </h2>

            <div className="flex flex-col gap-4">

              <div>
                <label style={{ color: "#606C38" }} className="text-sm font-semibold block mb-1">
                  Category <span style={{ color: "#BC6C25" }}>*</span>
                </label>
                <select style={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ color: "#606C38" }} className="text-sm font-semibold block mb-1">
                  Description <span style={{ color: "#BC6C25" }}>*</span>
                </label>
                <textarea
                  style={{ ...inputStyle, resize: "none", height: 110 }}
                  placeholder="Describe what you need and how urgent it is..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label style={{ color: "#606C38" }} className="text-sm font-semibold block mb-1">
                  Location / Area <span style={{ color: "#BC6C25" }}>*</span>
                </label>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="e.g. Kibera, Nairobi"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <label style={{ color: "#606C38" }} className="text-sm font-semibold block mb-1">
                  Need expires on <span style={{ color: "#888" }}>(optional)</span>
                </label>
                <input
                  style={inputStyle}
                  type="date"
                  value={expiryDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>

              <div>
                <label style={{ color: "#606C38" }} className="text-sm font-semibold block mb-1">
                  Your Name <span style={{ color: "#888" }}>(optional)</span>
                </label>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Leave blank to stay anonymous"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <button
                onClick={handleSubmit}
                style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
                className="w-full py-3 rounded-full font-semibold mt-2 hover:opacity-90 transition-all"
              >
                Post My Need
              </button>

            </div>
          </div>
        ) : (
          <div
            style={{ backgroundColor: "#fff", border: "1px solid #DDA15E" }}
            className="rounded-2xl p-6 h-fit text-center"
          >
            <h2 style={{ color: "#BC6C25" }} className="text-xl font-bold mb-3">
              You are in Give Mode
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Browse open requests on the right and click{" "}
              <strong style={{ color: "#606C38" }}>I Can Help</strong> on any
              need you can fulfil. You will be taken directly to a private
              chat with that person.
            </p>
            <div
              style={{ backgroundColor: "#FEFAE0", border: "1px solid #DDA15E" }}
              className="rounded-xl p-4 mt-6 text-left"
            >
              <p style={{ color: "#606C38" }} className="text-xs font-semibold mb-2">
                How it works
              </p>
              <p className="text-xs text-gray-500 mb-1">1. Browse needs on the right</p>
              <p className="text-xs text-gray-500 mb-1">2. Click I Can Help on a request</p>
              <p className="text-xs text-gray-500 mb-1">3. A private chat opens automatically</p>
              <p className="text-xs text-gray-500">4. Coordinate the handover in chat</p>
            </div>
          </div>
        )}

        {/* RIGHT — FEED */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2
              style={{ color: activeTab === "need" ? "#606C38" : "#BC6C25" }}
              className="text-xl font-bold"
            >
              {activeTab === "need" ? "All Requests" : "Open Requests"}
            </h2>
            <select
              style={{ ...inputStyle, width: "auto", padding: "6px 12px", fontSize: 13 }}
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {filteredRequests.length === 0 ? (
            <div
              style={{ border: "1px dashed #DDA15E", color: "#888" }}
              className="rounded-2xl p-10 text-center"
            >
              <p className="text-lg font-semibold">
                {activeTab === "offer" ? "No open requests right now" : "No requests yet"}
              </p>
              <p className="text-sm mt-2">
                {activeTab === "offer"
                  ? "Check back later or switch to post your own need."
                  : "Be the first to post a need."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {[...filteredRequests].reverse().map((item) => {
                const expired = isExpired(item.expiryDate);
                return (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: expired ? "#f5f5f5" : "#fff",
                      border: `1px solid ${expired ? "#ccc" : "#DDA15E"}`,
                      opacity: expired ? 0.7 : 1,
                    }}
                    className="rounded-2xl p-5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        style={{ backgroundColor: getCategoryColor(item.category), color: "#FEFAE0" }}
                        className="text-xs px-3 py-1 rounded-full font-semibold"
                      >
                        {item.category}
                      </span>
                      <span
                        style={{
                          backgroundColor: item.claimed ? "#DDA15E" : expired ? "#ccc" : "#FEFAE0",
                          border: `1px solid ${item.claimed ? "#DDA15E" : expired ? "#ccc" : "#606C38"}`,
                          color: item.claimed ? "#fff" : expired ? "#888" : "#606C38",
                        }}
                        className="text-xs px-3 py-1 rounded-full font-semibold"
                      >
                        {expired ? "Expired" : item.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-2 mb-2">{item.description}</p>

                    {item.expiryDate && (
                      <p
                        style={{ color: expired ? "#a44a4a" : "#BC6C25" }}
                        className="text-xs font-semibold mb-2"
                      >
                        {expired
                          ? "This listing has expired"
                          : `Expires on ${new Date(item.expiryDate).toLocaleDateString()}`}
                      </p>
                    )}

                    {item.claimed && item.claimedBy && (
                      <p
                        style={{ color: "#606C38" }}
                        className="text-xs font-semibold mb-2"
                      >
                        Claimed by {item.claimedBy}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <span>{item.location}</span>
                      <span>{item.name} · {item.date}</span>
                    </div>

                    {activeTab === "offer" && !item.claimed && !expired && (
                      <button
                        onClick={() => handleClaim(item)}
                        style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
                        className="w-full py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
                      >
                        I Can Help
                      </button>
                    )}

                    {activeTab === "offer" && item.claimed && (
                      <p style={{ color: "#DDA15E" }} className="text-center text-sm font-semibold">
                        Someone is on the way
                      </p>
                    )}

                    {activeTab === "need" && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          backgroundColor: "#FEFAE0",
                          border: "1px solid #a44a4a",
                          color: "#a44a4a",
                        }}
                        className="w-full py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
                      >
                        Remove Request
                      </button>
                    )}

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default HelpPage;