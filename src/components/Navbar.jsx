import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { clearUser } from "../store/slices/authSlice";
import SettingsPanel from "./SettingsPanel";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);
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
    <>
      <nav
        style={{ backgroundColor: "#FEFAE0", borderBottom: "2px solid #DDA15E" }}
        className="px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50"
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/src/assets/local roots logo.jpg"
            alt="Local Roots Logo"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span style={{ color: "#606C38" }} className="text-xl font-bold tracking-tight">
            Local Roots
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: location.pathname === link.to ? "#BC6C25" : "#606C38",
                borderBottom: location.pathname === link.to ? "2px solid #BC6C25" : "none",
                fontWeight: location.pathname === link.to ? "600" : "400",
              }}
              className="text-sm pb-1 transition-all hover:text-amber-700"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                {user.photo ? (
                  <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div
                    style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span style={{ color: "#606C38" }} className="text-sm font-semibold">
                  {user.name?.split("·")[0].trim()}
                </span>
              </div>
              <button
                onClick={() => setSettingsOpen(true)}
                style={{ backgroundColor: "#DDA15E", color: "#1a2e0a" }}
                className="px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                style={{ backgroundColor: "transparent", border: "1px solid #BC6C25", color: "#BC6C25" }}
                className="px-4 py-2 rounded-full text-sm font-semibold hover:opacity-80 transition-all"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
              className="px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
            >
              Join Us
            </Link>
          )}
        </div>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span
            style={{
              display: "block",
              width: 24,
              height: 2,
              backgroundColor: "#606C38",
              borderRadius: 2,
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 24,
              height: 2,
              backgroundColor: "#606C38",
              borderRadius: 2,
              transition: "all 0.3s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: 24,
              height: 2,
              backgroundColor: "#606C38",
              borderRadius: 2,
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: "#FEFAE0",
            borderBottom: "2px solid #DDA15E",
            position: "sticky",
            top: 65,
            zIndex: 40,
          }}
          className="md:hidden px-6 py-4 flex flex-col gap-4"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                color: location.pathname === link.to ? "#BC6C25" : "#606C38",
                fontWeight: location.pathname === link.to ? "600" : "400",
              }}
              className="text-sm py-2 border-b border-amber-100"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-2">
                {user.photo ? (
                  <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div
                    style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span style={{ color: "#606C38" }} className="text-sm font-semibold">
                  {user.name?.split("·")[0].trim()}
                </span>
              </div>
              <button
                onClick={() => { setSettingsOpen(true); setMenuOpen(false); }}
                style={{ backgroundColor: "#DDA15E", color: "#1a2e0a" }}
                className="w-full py-2 rounded-full text-sm font-semibold"
              >
                Settings
              </button>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                style={{ border: "1px solid #BC6C25", color: "#BC6C25", backgroundColor: "transparent" }}
                className="w-full py-2 rounded-full text-sm font-semibold"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
              className="w-full py-2 rounded-full text-sm font-semibold text-center"
            >
              Join Us
            </Link>
          )}
        </div>
      )}

      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}

export default Navbar;