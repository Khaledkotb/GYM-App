function Navbar() {
    return (
        <nav
            style={{
                height: "72px",
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 24px",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.18)",
            }}
        >
            <div style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "0.5px" }}>GYMSYS</div>
            <div style={{ color: "#cbd5e1", fontSize: "14px" }}>Gym Management Dashboard</div>
        </nav>
    );
}

export default Navbar;