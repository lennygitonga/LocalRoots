import { useState } from "react";

function HelpPage() {
  const [activeTab, setActiveTab] = useState("need");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [requests, setRequests] = useState([]);
  const [offers, setOffers] = useState([]);
  const [filter, setFilter] = useState("All");

  const categories = ["Food", "Clothing", "Shelter", "Water", "Medicine"];

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
      status: activeTab === "need" ? "Needs Help" : "Offering Help",
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
  }

  function getCategoryColor(cat) {
    const colors = {
      Food: "#606C38",
      Clothing: "#BC6C25",
      Shelter: "#DDA15E",
      Water: "#4A90A4",
      Medicine: "#8B4B6B",
    };
    return colors[cat] || "#888";
  }

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

  const activeList = activeTab === "need" ? requests : offers;
  const filteredList =
    filter === "All"
      ? activeList
      : activeList.filter((item) => item.category === filter);

  return (
    <div style={{ backgroundColor: "#FEFAE0" }} className="min-h-screen px-6 py-10">

      <h1
        style={{ color: "#606C38" }}
        className="text-3xl font-bold mb-2 text-center"
      >
        Community Help Board
      </h1>
      <p className="text-center text-gray-500 text-sm mb-8">
        Ask for help or offer support to neighbours in your area.
      </p>

      {/* TABS */}
      <div className="flex justify-center mb-8">
        <div
          style={{ backgroundColor: "#fff", border: "1px solid #DDA15E" }}
          className="flex rounded-full p-1"
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
                style={{ ...inputStyle, resize: "none", height: 120 }}
                placeholder={
                  activeTab === "need"
                    ? "Describe what you need..."
                    : "Describe what you can offer..."
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

            {/* Optional name */}
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
              {activeTab === "need" ? "Post My Need" : "Offer My Help"}
            </button>

          </div>
        </div>

       
  );
}

export default HelpPage;