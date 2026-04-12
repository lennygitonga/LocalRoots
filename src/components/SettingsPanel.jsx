import { useState } from "react";
import { useSelector } from "react-redux";

function SettingsPanel({ isOpen, onClose }) {
  const user = useSelector((state) => state.auth.user);

  const [fontSize, setFontSize] = useState("Medium");
  const [highContrast, setHighContrast] = useState(false);
  const [language, setLanguage] = useState("English");
  const [screenReader, setScreenReader] = useState(false);
  const [notifyReports, setNotifyReports] = useState(true);
  const [notifyHelp, setNotifyHelp] = useState(true);
  const [notifyChat, setNotifyChat] = useState(false);
  const [activeSection, setActiveSection] = useState("account");

  const inputStyle = {
    backgroundColor: "#FEFAE0",
    border: "1px solid #DDA15E",
    borderRadius: 8,
    padding: "8px 12px",
    width: "100%",
    fontSize: 13,
    color: "#1a1a1a",
    outline: "none",
  };

  function Toggle({ value, onChange }) {
    return (
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          backgroundColor: value ? "#606C38" : "#ccc",
          border: "none",
          cursor: "pointer",
          position: "relative",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            left: value ? 23 : 3,
            width: 18,
            height: 18,
            borderRadius: "50%",
            backgroundColor: "#fff",
            transition: "left 0.2s",
          }}
        />
      </button>
    );
  }

  function SectionBtn({ id, label }) {
    return (
      <button
        onClick={() => setActiveSection(id)}
        style={{
          backgroundColor: activeSection === id ? "#606C38" : "transparent",
          color: activeSection === id ? "#FEFAE0" : "#606C38",
          border: "1px solid #DDA15E",
          borderRadius: 20,
          padding: "6px 16px",
          fontSize: 12,
          fontFamily: "Georgia, serif",
          cursor: "pointer",
          fontWeight: activeSection === id ? "bold" : "normal",
          transition: "all 0.2s",
        }}
      >
        {label}
      </button>
    );
  }

  function Row({ label, children }) {
    return (
      <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #f0e8d8" }}>
        <span style={{ color: "#333", fontSize: 13 }}>{label}</span>
        {children}
      </div>
    );
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 40 }}
        />
      )}

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : "-420px",
          width: 400,
          height: "100vh",
          backgroundColor: "#FEFAE0",
          borderLeft: "2px solid #DDA15E",
          zIndex: 50,
          transition: "right 0.3s ease",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div style={{ backgroundColor: "#606C38", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ color: "#FEFAE0", fontSize: 18, fontFamily: "Georgia, serif", fontWeight: "bold", margin: 0 }}>Settings</h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#FEFAE0", fontSize: 22, cursor: "pointer", lineHeight: 1 }}
          >
            &times;
          </button>
        </div>

        {/* Section tabs */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #DDA15E", display: "flex", gap: 8, flexWrap: "wrap" }}>
          <SectionBtn id="account" label="Account" />
          <SectionBtn id="accessibility" label="Accessibility" />
          <SectionBtn id="notifications" label="Notifications" />
        </div>

        {/* Content */}
        <div style={{ padding: "20px" }}>

          {/* ACCOUNT */}
          {activeSection === "account" && (
            <div>
              <h3 style={{ color: "#BC6C25", fontSize: 15, fontWeight: "bold", marginBottom: 16, fontFamily: "Georgia, serif" }}>Account Details</h3>

              {user ? (
                <div>
                  <div style={{ backgroundColor: "#fff", border: "1px solid #DDA15E", borderRadius: 12, padding: 16, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                    {user.photo ? (
                      <img src={user.photo} alt={user.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#606C38", color: "#FEFAE0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: "bold" }}>
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p style={{ fontSize: 15, fontWeight: "bold", color: "#333", margin: 0 }}>{user.name?.split("·")[0].trim()}</p>
                      <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{user.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div>
                      <label style={{ color: "#606C38", fontSize: 12, fontWeight: "bold", display: "block", marginBottom: 4 }}>Display Name</label>
                      <input style={inputStyle} type="text" defaultValue={user.name?.split("·")[0].trim()} placeholder="Your name" />
                    </div>
                    <div>
                      <label style={{ color: "#606C38", fontSize: 12, fontWeight: "bold", display: "block", marginBottom: 4 }}>Your Area</label>
                      <input style={inputStyle} type="text" defaultValue={user.name?.split("·")[1]?.trim()} placeholder="e.g. Westlands, Nairobi" />
                    </div>
                    <button style={{ backgroundColor: "#606C38", color: "#FEFAE0", border: "none", borderRadius: 20, padding: "8px 20px", fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: "bold", marginTop: 4 }}>
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <p style={{ color: "#888", fontSize: 13 }}>Please log in to view account details.</p>
              )}
            </div>
          )}

          {/* ACCESSIBILITY */}
          {activeSection === "accessibility" && (
            <div>
              <h3 style={{ color: "#BC6C25", fontSize: 15, fontWeight: "bold", marginBottom: 16, fontFamily: "Georgia, serif" }}>Accessibility</h3>

              <Row label="Font Size">
                <div style={{ display: "flex", gap: 6 }}>
                  {["Small", "Medium", "Large"].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setFontSize(size);
                        document.documentElement.style.fontSize =
                          size === "Small" ? "14px" : size === "Large" ? "18px" : "16px";
                      }}
                      style={{
                        backgroundColor: fontSize === size ? "#606C38" : "#fff",
                        color: fontSize === size ? "#FEFAE0" : "#606C38",
                        border: "1px solid #DDA15E",
                        borderRadius: 6,
                        padding: "4px 10px",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </Row>

              <Row label="High Contrast Mode">
                <Toggle value={highContrast} onChange={(val) => {
                  setHighContrast(val);
                  document.documentElement.style.filter = val ? "contrast(1.4)" : "contrast(1)";
                }} />
              </Row>

              <Row label="Language">
                <select
                  style={{ ...inputStyle, width: "auto" }}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Swahili">Swahili</option>
                </select>
              </Row>

              <Row label="Screen Reader Labels">
                <Toggle value={screenReader} onChange={setScreenReader} />
              </Row>

              {screenReader && (
                <p style={{ color: "#606C38", fontSize: 12, marginTop: 8, backgroundColor: "#fff", padding: 10, borderRadius: 8, border: "1px solid #DDA15E" }}>
                  Screen reader labels are now active. All buttons and inputs have descriptive aria labels.
                </p>
              )}
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeSection === "notifications" && (
            <div>
              <h3 style={{ color: "#BC6C25", fontSize: 15, fontWeight: "bold", marginBottom: 16, fontFamily: "Georgia, serif" }}>Notifications</h3>
              <p style={{ color: "#888", fontSize: 12, marginBottom: 16 }}>Choose what you want to be notified about in your area.</p>

              <Row label="New abuse reports in my area">
                <Toggle value={notifyReports} onChange={setNotifyReports} />
              </Row>
              <Row label="Help requests near me">
                <Toggle value={notifyHelp} onChange={setNotifyHelp} />
              </Row>
              <Row label="New community chat messages">
                <Toggle value={notifyChat} onChange={setNotifyChat} />
              </Row>

              <div style={{ backgroundColor: "#fff", border: "1px solid #DDA15E", borderRadius: 10, padding: 12, marginTop: 16 }}>
                <p style={{ color: "#606C38", fontSize: 12, fontWeight: "bold", margin: "0 0 4px" }}>Note</p>
                <p style={{ color: "#888", fontSize: 12, margin: 0 }}>Push notifications require browser permission. You will be prompted when a notification is triggered.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default SettingsPanel;