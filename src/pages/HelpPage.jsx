import { useState } from "react";

function HelpPage() {
  const [activeTab, setActiveTab] = useState("need");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [requests, setRequests] = useState([]);
  const [offers, setOffers] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");

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

    const newEntry = {
      id: Date.now(),
      category,
      description,
      location,
      name: name || "Anonymous",
      date: new Date().toLocaleDateString(),
      expiryDate: expiryDate || null,
      status: activeTab === "need" ? "Needs Help" : "Offering Help",
      claimed: false,
    };

    if (activeTab === "need") {
      setRequests([newEntry, ...requests]);
    } else {
      setOffers([newEntry, ...offers]);
    }

    setCategory("");
    setDescription("");
    setLocation("");
    setName("");
    setExpiryDate("");
  }

  function handleClaim(id) {
    setRequests(requests.map((r) =>
      r.id === id ? { ...r, claimed: true, status: "Claimed" } : r
    ));
  }

  function handleDelete(id) {
    setOffers(offers.filter((o) => o.id !== id));
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

  const displayList = activeTab === "need" ? requests : offers;
  const filteredList =
    filterCategory === "All"
      ? displayList
      : displayList.filter((item) => item.category === filterCategory);

  return (
    <div style={{ backgroundColor: "#FEFAE0" }} className="min-h-screen px-6 py-10">

      <h1
        style={{ color: "#606C38" }}
        className="text-3xl font-bold mb-2 text-center"
      >
        Community Help Board
      </h1>
      <p className="text-center text-gray-500 text-sm mb-8">
        Request help from your community or offer support to those in need.
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

        {/* LEFT — FORM */}
        <div
          style={{ backgroundColor: "#fff", border: "1px solid #DDA15E" }}
          className="rounded-2xl p-6 h-fit"
        >
          <h2
            style={{ color: activeTab === "need" ? "#606C38" : "#BC6C25" }}
            className="text-xl font-bold mb-6"
          >
            {activeTab === "need" ? "Post a Need" : "Offer Support"}
          </h2>

          <div className="flex flex-col gap-4">

            {/* Category */}
            <div>
              <label
                style={{ color: "#606C38" }}
                className="text-sm font-semibold block mb-1"
              >
                Category <span style={{ color: "#BC6C25" }}>*</span>
              </label>
              <select
                style={inputStyle}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label
                style={{ color: "#606C38" }}
                className="text-sm font-semibold block mb-1"
              >
                Description <span style={{ color: "#BC6C25" }}>*</span>
              </label>
              <textarea
                style={{ ...inputStyle, resize: "none", height: 110 }}
                placeholder={
                  activeTab === "need"
                    ? "Describe what you need and how urgent it is..."
                    : "Describe what you are offering and how to collect it..."
                }
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Location */}
            <div>
              <label
                style={{ color: "#606C38" }}
                className="text-sm font-semibold block mb-1"
              >
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

            {/* Expiry Date */}
            <div>
              <label
                style={{ color: "#606C38" }}
                className="text-sm font-semibold block mb-1"
              >
                {activeTab === "need" ? "Need expires on" : "Offer expires on"}{" "}
                <span style={{ color: "#888" }}>(optional)</span>
              </label>
              <input
                style={inputStyle}
                type="date"
                value={expiryDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>

            {/* Name */}
            <div>
              <label
                style={{ color: "#606C38" }}
                className="text-sm font-semibold block mb-1"
              >
                Your Name{" "}
                <span style={{ color: "#888" }}>(optional)</span>
              </label>
              <input
                style={inputStyle}
                type="text"
                placeholder="Leave blank to stay anonymous"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: activeTab === "need" ? "#606C38" : "#BC6C25",
                color: "#FEFAE0",
              }}
              className="w-full py-3 rounded-full font-semibold mt-2 hover:opacity-90 transition-all"
            >
              {activeTab === "need" ? "Post My Need" : "Offer My Support"}
            </button>

          </div>
        </div>

        {/* RIGHT — FEED */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2
              style={{ color: activeTab === "need" ? "#606C38" : "#BC6C25" }}
              className="text-xl font-bold"
            >
              {activeTab === "need" ? "Help Requests" : "Support Offers"}
            </h2>

            <select
              style={{
                ...inputStyle,
                width: "auto",
                padding: "6px 12px",
                fontSize: 13,
              }}
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {filteredList.length === 0 ? (
            <div
              style={{ border: "1px dashed #DDA15E", color: "#888" }}
              className="rounded-2xl p-10 text-center"
            >
              <p className="text-lg font-semibold">Nothing here yet</p>
              <p className="text-sm mt-2">
                {activeTab === "need"
                  ? "Help requests will appear here."
                  : "Support offers will appear here."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredList.map((item) => {
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
                    {/* Top row — category + status */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        style={{
                          backgroundColor: getCategoryColor(item.category),
                          color: "#FEFAE0",
                        }}
                        className="text-xs px-3 py-1 rounded-full font-semibold"
                      >
                        {item.category}
                      </span>
                      <span
                        style={{
                          backgroundColor: item.claimed
                            ? "#DDA15E"
                            : expired
                            ? "#ccc"
                            : "#FEFAE0",
                          border: `1px solid ${item.claimed ? "#DDA15E" : expired ? "#ccc" : "#606C38"}`,
                          color: item.claimed
                            ? "#fff"
                            : expired
                            ? "#888"
                            : "#606C38",
                        }}
                        className="text-xs px-3 py-1 rounded-full font-semibold"
                      >
                        {expired ? "Expired" : item.status}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mt-2 mb-2">
                      {item.description}
                    </p>

                    {/* Expiry notice */}
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

                    {/* Location + name */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <span>{item.location}</span>
                      <span>{item.name} · {item.date}</span>
                    </div>

                    {/* Action buttons */}
                    {!expired && activeTab === "need" && !item.claimed && (
                      <button
                        onClick={() => handleClaim(item.id)}
                        style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
                        className="w-full py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
                      >
                        Claim — I Can Help
                      </button>
                    )}

                    {activeTab === "need" && item.claimed && (
                      <p
                        style={{ color: "#DDA15E" }}
                        className="text-center text-sm font-semibold"
                      >
                        Someone is on the way
                      </p>
                    )}

                    {activeTab === "offer" && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          backgroundColor: "#FEFAE0",
                          border: "1px solid #a44a4a",
                          color: "#a44a4a",
                        }}
                        className="w-full py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
                      >
                        Remove Offer
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