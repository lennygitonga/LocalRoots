import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: "#1a2e0a", borderTop: "2px solid #DDA15E" }}
      className="px-8 py-10"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Column 1: Logo + Description */}
        <div className="flex flex-col gap-2">
          <span style={{ color: "#FEFAE0" }} className="text-lg font-bold">
            Local Roots
          </span>
          <p style={{ color: "#DDA15E" }} className="text-sm leading-relaxed">
            Protect and support your community. Every neighbour matters.
          </p>
        </div>

        {/* Column 2: Nav Links */}
        <div className="flex flex-col gap-3">
          <h4 style={{ color: "#DDA15E" }} className="text-sm font-bold mb-1 tracking-wide">
            PAGES
          </h4>
          {[
            { to: "/", label: "Home" },
            { to: "/report", label: "Report Abuse" },
            { to: "/help", label: "Request Help" },
            { to: "/chat", label: "Community Chat" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{ color: "#FEFAE0" }}
              className="text-sm hover:opacity-70 transition-all w-fit"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Column 3: Social Links */}
        <div className="flex flex-col gap-3">
          <h4 style={{ color: "#DDA15E" }} className="text-sm font-bold mb-1 tracking-wide">
            CONNECT
          </h4>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#FEFAE0" }}
            className="text-sm hover:opacity-70 transition-all flex items-center gap-2 w-fit"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#FEFAE0" }}
            className="text-sm hover:opacity-70 transition-all flex items-center gap-2 w-fit"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#FEFAE0" }}
            className="text-sm hover:opacity-70 transition-all flex items-center gap-2 w-fit"
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div
        style={{ borderTop: "1px solid rgba(221,161,94,0.3)" }}
        className="mt-10 pt-6 text-center"
      >
        <p style={{ color: "#DDA15E" }} className="text-xs">
          © {currentYear} Local Roots. Built with purpose, rooted in community.
        </p>
      </div>
    </footer>
  );
}

export default Footer;