import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
        color: "white",
        padding: "24px 20px",
        minHeight: "100vh",
        boxShadow: "2px 0 16px rgba(15, 23, 42, 0.2)",
      }}
    >
      <h2 style={{ margin: "0 0 24px", fontSize: "24px", fontWeight: 700 }}>GYMSYS</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link
          to="/"
          style={{
            color: "#e2e8f0",
            textDecoration: "none",
            padding: "10px 12px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/members"
          style={{
            color: "#e2e8f0",
            textDecoration: "none",
            padding: "10px 12px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          Members
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;