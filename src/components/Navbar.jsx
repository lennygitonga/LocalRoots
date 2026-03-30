import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    const links = [
        { to: "/", label: "Home" },
        { to: "/report", label: "Report Abuse" },
        { to: "/help", label: "Request Help" },
        { to: "/chat", label: "Community Chat" },
    ];

    return (
        <nav
            style={{ backgroundColor: "#FEFAE0", borderBottom: "2px solid #DDA15E" }}
            className="px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50"
        >
            {/* Logo */}
            <div className="flex items-center gap-2">
                <img
                    src="/src/assets/local roots logo.jpg"
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
                                location.pathname === link.to ? "2px solid #BC6C25" : "none",
                            fontWeight: location.pathname === link.to ? "600" : "400",
                        }}
                        className="text-sm pb-1 transition-all hover:text-amber-700"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* CTA Button */}
            <Link
                to="/chat"
                style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
                className="px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
            >
                Join the Chat
            </Link>
        </nav>
    );
}

export default Navbar;