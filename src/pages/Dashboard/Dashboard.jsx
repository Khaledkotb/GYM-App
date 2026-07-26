import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

const initialMembers = [
  { id: 1, name: "Khaled", email: "khaled@gmail.com", phone: "+201282708833", status: "Active", expiry: "2026-12-31" },
  { id: 2, name: "Ahmed", email: "ahmed@gmail.com", phone: "+201090801144", status: "Expired", expiry: "2023-06-30" },
  { id: 3, name: "Mona", email: "mona@gmail.com", phone: "+201001112233", status: "Active", expiry: "2026-09-01" },
  { id: 4, name: "Omar", email: "omar@gmail.com", phone: "+201122334455", status: "Active", expiry: "2026-11-15" },
];

function getStoredMembers() {
  try {
    const raw = localStorage.getItem("gymsys_members");
    return raw ? JSON.parse(raw) : initialMembers;
  } catch {
    return initialMembers;
  }
}

function Dashboard() {
  const [members] = useState(getStoredMembers);
  const [now] = useState(() => Date.now());

  const totalMembers = members.length;
  const activeMembers = members.filter((m) => {
    if (!m.expiry) return m.status === "Active";
    return Date.parse(m.expiry) >= now;
  }).length;
  const expiredMembers = totalMembers - activeMembers;

  const recentMembers = members.slice(0, 4);

  return (
    <MainLayout>
      <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#0f172a", margin: "0 0 6px" }}>
            لوحة التحكم (Dashboard)
          </h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
            ملخص سريع لنظام إدارة الجيم والاشتراكات
          </p>
        </div>

        {/* Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          {/* Card 1: Total Members */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#eff6ff",
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
              }}
            >
              👥
            </div>
            <div>
              <span style={{ fontSize: "13px", color: "#64748b", display: "block" }}>إجمالي الأعضاء</span>
              <strong style={{ fontSize: "24px", color: "#0f172a" }}>{totalMembers}</strong>
            </div>
          </div>

          {/* Card 2: Active Subscriptions */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#f0fdf4",
                color: "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
              }}
            >
              ✅
            </div>
            <div>
              <span style={{ fontSize: "13px", color: "#64748b", display: "block" }}>اشتراكات نشطة</span>
              <strong style={{ fontSize: "24px", color: "#16a34a" }}>{activeMembers}</strong>
            </div>
          </div>

          {/* Card 3: Expired Subscriptions */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#fef2f2",
                color: "#dc2626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
              }}
            >
              ⚠️
            </div>
            <div>
              <span style={{ fontSize: "13px", color: "#64748b", display: "block" }}>اشتراكات منتهية</span>
              <strong style={{ fontSize: "24px", color: "#dc2626" }}>{expiredMembers}</strong>
            </div>
          </div>
        </div>

        {/* Main Section: Recent Members & Quick Actions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Recent Members List */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#0f172a" }}>
                أحدث الأعضاء
              </h3>
              <Link
                to="/members"
                style={{ fontSize: "13px", color: "#2563eb", textDecoration: "none", fontWeight: "500" }}
              >
                عرض الكل ←
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentMembers.map((m) => {
                const isActive = !m.expiry || Date.parse(m.expiry) >= now;
                return (
                  <div
                    key={m.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      background: "#f8fafc",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "14px", color: "#1e293b" }}>{m.name}</div>
                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>{m.email}</div>
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background: isActive ? "#dcfce7" : "#fee2e2",
                        color: isActive ? "#15803d" : "#b91c1c",
                      }}
                    >
                      {isActive ? "نشط" : "منتهي"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: "600", color: "#0f172a" }}>
                إجراءات سريعة
              </h3>
              <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 20px" }}>
                إدارة أعضاء الجيم والاشتراكات بسهولة
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Link
                  to="/members"
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: "#0f172a",
                    color: "white",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  ➕ إدارة وحفظ الأعضاء
                </Link>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                padding: "12px",
                borderRadius: "10px",
                background: "#f1f5f9",
                fontSize: "12px",
                color: "#475569",
              }}
            >
              💡 **ملاحظة:** تظهر البيانات تلقائياً بناءً على الأعضاء المسجلين في النظام.
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;


