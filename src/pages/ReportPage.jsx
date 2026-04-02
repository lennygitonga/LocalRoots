import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReport, resolveReport, setReports } from "../store/slices/reportsSlice";
import { fetchReports, createReport, resolveReport as resolveReportAPI } from "../api";

function ReportPage() {
  const [type, setType] = useState("");
  const [otherType, setOtherType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reports);

useEffect(() => {
  async function loadReports() {
    try {
      const data = await fetchReports();
      dispatch(setReports(data));
    } catch (err) {
      console.error("Failed to load reports:", err);
    }
  }
  loadReports();
}, []);

  async function handleSubmit() {
    if (!type || !description || !location || !urgency) {
      alert("Please fill in all required fields.");
      return;
    }

    if (type === "Other" && !otherType) {
      alert("Please specify the type of abuse.");
      return;
    }

    const newReport = {
      type: type === "Other" ? otherType : type,
      description,
      location,
      urgency,
      name: name || "Anonymous",
      status: "Open",
      date: new Date().toLocaleDateString(),
    };

    try {
      const saved = await createReport(newReport);
      dispatch(addReport(saved));
    } catch (err) {
      console.error("Failed to save report:", err);
    }

    setType("");
    setOtherType("");
    setDescription("");
    setLocation("");
    setUrgency("");
    setName("");
  }

  function getUrgencyColor(urgency) {
    if (urgency === "High") return "#BC6C25";
    if (urgency === "Medium") return "#DDA15E";
    return "#606C38";
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

  return (
    <div style={{ backgroundColor: "#FEFAE0" }} className="min-h-screen px-6 py-10">

      <h1
        style={{ color: "#606C38" }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Report Abuse
      </h1>

      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">

        {/* LEFT — FORM */}
        <div
          style={{ backgroundColor: "#fff", border: "1px solid #DDA15E" }}
          className="rounded-2xl p-6 h-fit"
        >
          <h2
            style={{ color: "#BC6C25" }}
            className="text-xl font-bold mb-6"
          >
            Submit a Report
          </h2>

          <div className="flex flex-col gap-4">

            {/* Type of abuse */}
            <div>
              <label
                style={{ color: "#606C38" }}
                className="text-sm font-semibold block mb-1"
              >
                Type of Abuse <span style={{ color: "#BC6C25" }}>*</span>
              </label>
              <select
                style={inputStyle}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select type...</option>
                <option value="Child Abuse">Child Abuse</option>
                <option value="Domestic Violence">Domestic Violence</option>
                <option value="Elderly Mistreatment">Elderly Mistreatment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Show only when Other is selected */}
            {type === "Other" && (
              <div>
                <label
                  style={{ color: "#606C38" }}
                  className="text-sm font-semibold block mb-1"
                >
                  Please specify <span style={{ color: "#BC6C25" }}>*</span>
                </label>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Describe the type of abuse..."
                  value={otherType}
                  onChange={(e) => setOtherType(e.target.value)}
                />
              </div>
            )}

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
                placeholder="Describe what you witnessed or know..."
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
                placeholder="e.g. Westlands, Nairobi"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Urgency */}
            <div>
              <label
                style={{ color: "#606C38" }}
                className="text-sm font-semibold block mb-1"
              >
                Urgency Level <span style={{ color: "#BC6C25" }}>*</span>
              </label>
              <select
                style={inputStyle}
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
              >
                <option value="">Select urgency...</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
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

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
              className="w-full py-3 rounded-full font-semibold mt-2 hover:opacity-90 transition-all"
            >
              Submit Report
            </button>

          </div>
        </div>

        {/* RIGHT — REPORTS FEED */}
        <div>
          <h2
            style={{ color: "#BC6C25" }}
            className="text-xl font-bold mb-6"
          >
            Recent Reports
          </h2>

          {reports.length === 0 ? (
            <div
              style={{ border: "1px dashed #DDA15E", color: "#888" }}
              className="rounded-2xl p-10 text-center"
            >
              <p className="text-lg font-semibold">No reports yet</p>
              <p className="text-sm mt-2">
                Submitted reports will appear here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {[...reports].reverse().map((report) => (
                <div
                  key={report._id || report.id}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #DDA15E",
                  }}
                  className="rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      style={{ color: "#606C38" }}
                      className="font-bold text-sm"
                    >
                      {report.type}
                    </span>
                    <span
                      style={{
                        backgroundColor: getUrgencyColor(report.urgency),
                        color: "#FEFAE0",
                      }}
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                    >
                      {report.urgency}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{report.location}</span>
                    <span>{report.name} · {report.date}</span>
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    <span
                      style={{
                        backgroundColor: report.status === "Resolved" ? "#606C38" : "#FEFAE0",
                        border: `1px solid ${report.status === "Resolved" ? "#606C38" : "#DDA15E"}`,
                        color: report.status === "Resolved" ? "#FEFAE0" : "#606C38",
                      }}
                      className="text-xs px-3 py-1 rounded-full font-semibold w-fit"
                    >
                      {report.status}
                    </span>
                    {report.status === "Open" && (
                      <button
                        onClick={async () => {
                          try {
                            await resolveReportAPI(report._id || report.id);
                            dispatch(resolveReport(report._id || report.id));
                          } catch (err) {
                            console.error("Failed to resolve report:", err);
                          }
                        }}
                        style={{
                          backgroundColor: "#FEFAE0",
                          border: "1px solid #606C38",
                          color: "#606C38",
                        }}
                        className="w-full py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ReportPage;