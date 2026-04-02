import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { setUser, clearUser } from "../store/slices/authSlice";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const links = [
    { to: "/", label: "Home" },
    { to: "/report", label: "Report Abuse" },
    { to: "/help", label: "Request Help" },
    { to: "/chat", label: "Community Chat" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
          photo: firebaseUser.photoURL || null,
        }));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  async function handleLogout() {
    await signOut(auth);
    dispatch(clearUser());
    navigate("/auth");
  }

  return (
    <nav
      style={{ backgroundColor: "#FEFAE0", borderBottom: "2px solid #DDA15E" }}
      className="px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/images/local roots logo.png"
          alt="Local Roots Logo"
          className="w-9 h-9 rounded-full object-cover"
        />
        <span
          style={{ color: "#606C38" }}
          className="text-xl font-bold tracking-tight"
        >
          Local Roots
        </span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: location.pathname === link.to ? "#BC6C25" : "#606C38",
              borderBottom:
                location.pathname === link.to
                  ? "2px solid #BC6C25"
                  : "none",
              fontWeight: location.pathname === link.to ? "600" : "400",
            }}
            className="text-sm pb-1 transition-all hover:text-amber-700"
          >
            {link.to === "/chat" && link.label}
            {link.to !== "/chat" && link.label}
          </Link>
        ))}
      </div>

      {/* Right side — auth */}
      <div className="flex items-center gap-3">
       {user ? (
  <>
    {/* User avatar and name */}
    <div className="flex items-center gap-2">
      {user.photo ? (
        <img
          src={user.photo}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <div
          style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}
      <span
        style={{ color: "#606C38" }}
        className="text-sm font-semibold"
      >
        {user.name.split("·")[0].trim()}
      </span>
    </div>

    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "transparent",
        border: "1px solid #BC6C25",
        color: "#BC6C25",
      }}
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
    </nav>
  );
}

export default Navbar;