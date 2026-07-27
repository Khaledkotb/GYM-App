import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <style>{`
        .sidebar-shell {
          width: 240px;
          background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
          color: white;
          padding: 24px 20px;
          min-height: 100vh;
          box-shadow: 2px 0 16px rgba(15, 23, 42, 0.2);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sidebar-link {
          color: #e2e8f0;
          text-decoration: none;
          padding: 10px 12px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
        }

        @media (max-width: 900px) {
          .sidebar-shell {
            width: 100%;
            min-height: auto;
            padding: 16px;
          }

          .sidebar-nav {
            flex-direction: row;
            flex-wrap: wrap;
          }

          .sidebar-link {
            flex: 1 1 calc(50% - 8px);
            text-align: center;
          }
        }
      `}</style>

      <aside className="sidebar-shell">
        <h2 style={{ margin: "0 0 24px", fontSize: "24px", fontWeight: 700 }}>GYMSYS</h2>

        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link">
            Dashboard
          </Link>
          <Link to="/members" className="sidebar-link">
            Members
          </Link>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;