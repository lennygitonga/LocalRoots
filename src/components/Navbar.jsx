import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { setUser, clearUser } from "../store/slices/authSlice";
import SettingsPanel from "./SettingsPanel";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/report", label: "Report Abuse" },
    { to: "/help", label: "Request Help" },
    { to: "/chat", label: "Community Chat" },
  ];

  async function handleLogout() {
    await signOut(auth);
    dispatch(clearUser());
    navigate("/auth");
  }

  return (
    <nav
      style={{ backgroundColor: "#FEFAE0", borderBottom: "2px solid #DDA15E" }}
      className="px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50 w-full"
    >
      {/* 1. Logo Section */}
      <div className="flex items-center gap-2">
        <img
          src="/images/local roots logo.png"
          alt="Logo"
          className="w-9 h-9 rounded-full object-cover"
        />
        <span style={{ color: "#606C38" }} className="text-xl font-bold">
          Local Roots
        </span>
      </div>

      {/* 2. Middle Links Section */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: location.pathname === link.to ? "#BC6C25" : "#606C38",
              borderBottom: location.pathname === link.to ? "2px solid #BC6C25" : "none",
            }}
            className="text-sm font-medium whitespace-nowrap"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* 3. Right Side Section */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#606C38] text-[#FEFAE0] flex items-center justify-center text-sm font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={() => setSettingsOpen(true)}
              className="bg-[#DDA15E] text-[#1a2e0a] px-3 py-1.5 rounded-full text-xs font-bold hover:opacity-80"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="border border-[#BC6C25] text-[#BC6C25] px-3 py-1.5 rounded-full text-xs font-bold hover:bg-[#BC6C25] hover:text-white transition-all"
            >
              Log Out
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            className="bg-[#606C38] text-[#FEFAE0] px-5 py-2 rounded-full text-sm font-bold"
          >
            Join Us
          </Link>
        )}
      </div>

      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </nav> 
  );
}

export default Navbar;