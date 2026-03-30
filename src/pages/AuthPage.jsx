import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  async function handleEmailAuth() {
    setError("");
    setLoading(true);
    try {
      if (activeTab === "register") {
        if (!name || !area || !email || !password) {
          setError("Please fill in all fields.");
          setLoading(false);
          return;
        }
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, {
          displayName: `${name} · ${area}`,
        });
      } else {
        if (!email || !password) {
          setError("Please fill in all fields.");
          setLoading(false);
          return;
        }
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in.");
      } else if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setError("Incorrect email or password.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError("Google sign in failed. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        backgroundColor: "#1a2e0a",
        backgroundImage: "url('/src/assets/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex items-center justify-center px-4 py-16 relative"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      />

      {/* Card */}
      <div
        style={{
          backgroundColor: "#FEFAE0",
          border: "1px solid #DDA15E",
          position: "relative",
          zIndex: 10,
        }}
        className="rounded-2xl p-8 w-full max-w-md shadow-2xl"
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src="/src/assets/local roots logo.jpg"
            alt="Local Roots"
            className="w-14 h-14 rounded-full object-cover mx-auto mb-3"
          />
          <h1
            style={{ color: "#606C38" }}
            className="text-2xl font-bold"
          >
            Local Roots
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Every neighbour matters
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{ backgroundColor: "#e8e0cc" }}
          className="flex rounded-full p-1 gap-1 mb-6"
        >
          <button
            onClick={() => { setActiveTab("login"); setError(""); }}
            style={{
              backgroundColor: activeTab === "login" ? "#606C38" : "transparent",
              color: activeTab === "login" ? "#FEFAE0" : "#606C38",
            }}
            className="flex-1 py-2 rounded-full text-sm font-semibold transition-all"
          >
            Log In
          </button>
          <button
            onClick={() => { setActiveTab("register"); setError(""); }}
            style={{
              backgroundColor: activeTab === "register" ? "#BC6C25" : "transparent",
              color: activeTab === "register" ? "#FEFAE0" : "#BC6C25",
            }}
            className="flex-1 py-2 rounded-full text-sm font-semibold transition-all"
          >
            Sign Up
          </button>
        </div>

        <div className="flex flex-col gap-4">

          {/* Name — register only */}
          {activeTab === "register" && (
            <div>
              <label
                style={{ color: "#606C38" }}
                className="text-sm font-semibold block mb-1"
              >
                Full Name <span style={{ color: "#BC6C25" }}>*</span>
              </label>
              <input
                style={inputStyle}
                type="text"
                placeholder="e.g. Jane Mwangi"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {/* Area — register only */}
          {activeTab === "register" && (
            <div>
              <label
                style={{ color: "#606C38" }}
                className="text-sm font-semibold block mb-1"
              >
                Your Area <span style={{ color: "#BC6C25" }}>*</span>
              </label>
              <input
                style={inputStyle}
                type="text"
                placeholder="e.g. Westlands, Nairobi"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label
              style={{ color: "#606C38" }}
              className="text-sm font-semibold block mb-1"
            >
              Email <span style={{ color: "#BC6C25" }}>*</span>
            </label>
            <input
              style={inputStyle}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label
              style={{ color: "#606C38" }}
              className="text-sm font-semibold block mb-1"
            >
              Password <span style={{ color: "#BC6C25" }}>*</span>
            </label>
            <input
              style={inputStyle}
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error */}
          {error && (
            <p
              style={{
                color: "#a44a4a",
                backgroundColor: "rgba(164,74,74,0.08)",
                border: "1px solid #a44a4a",
              }}
              className="text-sm px-4 py-2 rounded-lg"
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            onClick={handleEmailAuth}
            disabled={loading}
            style={{
              backgroundColor: activeTab === "login" ? "#606C38" : "#BC6C25",
              color: "#FEFAE0",
              opacity: loading ? 0.7 : 1,
            }}
            className="w-full py-3 rounded-full font-semibold hover:opacity-90 transition-all"
          >
            {loading
              ? "Please wait..."
              : activeTab === "login"
              ? "Log In"
              : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div style={{ backgroundColor: "#DDA15E" }} className="flex-1 h-px" />
            <span className="text-xs text-gray-400">or</span>
            <div style={{ backgroundColor: "#DDA15E" }} className="flex-1 h-px" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #DDA15E",
              color: "#1a1a1a",
            }}
            className="w-full py-3 rounded-full font-semibold flex items-center justify-center gap-3 hover:opacity-80 transition-all"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-4 h-4"
            />
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  );
}

export default AuthPage;