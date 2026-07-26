import { useMemo, useState, useEffect } from "react";
import MainLayout from "../../components/layout/MainLayout";
import ActionToolbar from "./components/ActionToolbar";
import Filters from "./components/Filters";
import MemberForm from "./components/MemberForm";
import MembersTable from "./components/MembersTable";
import Pagination from "./components/Pagination";

const MEMBERS_PER_PAGE = 5;
const PLAN_LIMIT = 12;

const initialMembers = [
  { id: 1, name: "Khaled", email: "khaled@gmail.com", phone: "+201282708833", status: "Active", expiry: "2026-12-31" },
  { id: 2, name: "Ahmed", email: "ahmed@gmail.com", phone: "+201090801144", status: "Expired", expiry: "2023-06-30" },
  { id: 3, name: "Mona", email: "mona@gmail.com", phone: "+201001112233", status: "Active", expiry: "2026-09-01" },
  { id: 4, name: "Omar", email: "omar@gmail.com", phone: "+201122334455", status: "Active", expiry: "2026-11-15" },
  { id: 5, name: "Sara", email: "sara@gmail.com", phone: "+201155667788", status: "Expired", expiry: "2024-01-10" },
  { id: 6, name: "Youssef", email: "youssef@gmail.com", phone: "+201022334455", status: "Active", expiry: "2027-02-20" },
  { id: 7, name: "Nour", email: "nour@gmail.com", phone: "+201033445566", status: "Active", expiry: "2026-08-30" },
  { id: 8, name: "Hana", email: "hana@gmail.com", phone: "+201044556677", status: "Expired", expiry: "2022-12-01" },
  { id: 9, name: "Mostafa", email: "mostafa@gmail.com", phone: "+201055667788", status: "Active", expiry: "2026-10-05" },
  { id: 10, name: "Laila", email: "laila@gmail.com", phone: "+201066778899", status: "Active", expiry: "2026-07-30" },
  { id: 11, name: "Tarek", email: "tarek@gmail.com", phone: "+201077889900", status: "Active", expiry: "2026-12-01" },
  { id: 12, name: "Lelo", email: "lelo@gmail.com", phone: "+201033383892", status: "Expired", expiry: "2024-04-20" },
];

const emptyMember = { name: "", email: "", phone: "", status: "Active", expiry: "" };

const getStatusFromExpiry = (expiry, fallback = "Active") => {
  if (!expiry) return fallback;
  return Date.parse(expiry) < Date.now() ? "Expired" : "Active";
};

const normalizeMembers = (memberList) =>
  memberList.map((member) => ({
    ...member,
    status: getStatusFromExpiry(member.expiry, member.status),
  }));

const readStorage = (key, fallback) => {
  if (typeof localStorage === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
};

function Members() {
  const [members, setMembers] = useState(() => normalizeMembers(readStorage("gymsys_members", initialMembers)));
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMember, setViewMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState(null);
  const [newMember, setNewMember] = useState(emptyMember);

  useEffect(() => {
    writeStorage("gymsys_members", members);
  }, [members]);

  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(null), 5000);
    return () => clearTimeout(timeout);
  }, [notice]);

  const filteredMembers = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();
    return members.filter((member) => {
      const matchesSearch = `${member.name} ${member.email} ${member.phone}`.toLowerCase().includes(normalizedSearch);
      const matchesStatus = statusFilter === "All" || member.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [members, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / MEMBERS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const pageStart = (activePage - 1) * MEMBERS_PER_PAGE;
  const paginatedMembers = filteredMembers.slice(pageStart, pageStart + MEMBERS_PER_PAGE);
  const showingFrom = filteredMembers.length === 0 ? 0 : pageStart + 1;
  const showingTo = Math.min(pageStart + MEMBERS_PER_PAGE, filteredMembers.length);

  const resetForm = () => {
    setNewMember(emptyMember);
    setEditingId(null);
    setShowForm(false);
  };

  const handleToggleForm = () => {
    if (showForm) {
      resetForm();
      return;
    }
    setShowForm(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const cleanedMember = {
      name: newMember.name.trim(),
      email: newMember.email.trim().toLowerCase(),
      phone: newMember.phone.trim(),
      status: newMember.status,
      expiry: newMember.expiry ? newMember.expiry.trim() : "",
    };

    if (!cleanedMember.name || !cleanedMember.email || !cleanedMember.phone) {
      setNotice({ type: "error", message: "Please fill all member fields before saving." });
      return;
    }

    if (!cleanedMember.expiry) {
      setNotice({ type: "error", message: "Please provide an expiry date for the membership." });
      return;
    }

    const emailExists = members.some((m) => m.email.toLowerCase() === cleanedMember.email && m.id !== editingId);
    if (emailExists) {
      setNotice({ type: "error", message: "A member with this email already exists." });
      return;
    }

    if (editingId !== null) {
      setMembers((prev) => prev.map((m) => (m.id === editingId ? { ...m, ...cleanedMember } : m)));
      setNotice({ type: "success", message: "Member updated successfully." });
    } else {
      if (members.length >= PLAN_LIMIT) {
        setNotice({ type: "error", message: "Plan limit reached. You can only add up to 12 member" });
        return;
      }

      const memberToAdd = { id: Date.now(), ...cleanedMember };
      setMembers((prev) => [...prev, memberToAdd]);
      setCurrentPage(Math.ceil((members.length + 1) / MEMBERS_PER_PAGE));
      setNotice({ type: "success", message: "Member added successfully." });
    }

    resetForm();
  };

  const handleEdit = (member) => {
    setNewMember({
      name: member.name,
      email: member.email,
      phone: member.phone,
      status: member.status,
      expiry: member.expiry || "",
    });
    setEditingId(member.id);
    setShowForm(true);
    setNotice(null);
  };

  const handleDelete = (id) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
    setNotice({ type: "success", message: "Member deleted successfully." });
  };

  const handleView = (member) => setViewMember(member);

  const getStatusStyle = (status) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 700,
    background: status === "Active" ? "#dcfce7" : "#fee2e2",
    color: status === "Active" ? "#166534" : "#991b1b",
  });

  return (
    <MainLayout>
      <div className="members-card" style={{ padding: "28px", background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ margin: 0, color: "#0f172a", fontSize: "28px" }}>Members</h1>
            <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: "14px" }}>{members.length} members</p>
          </div>
          <ActionToolbar onToggleForm={handleToggleForm} showForm={showForm} />
        </div>

        {notice && (
          <div className={`members-notice ${notice.type === "error" ? "members-notice--error" : "members-notice--success"}`}>
            {notice.message}
          </div>
        )}

        <Filters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onSearch={handleSearch}
          onStatusChange={handleStatusFilter}
        />

        {showForm && (
          <MemberForm
            newMember={newMember}
            editingId={editingId}
            onChange={setNewMember}
            onSubmit={handleSave}
            onCancel={resetForm}
          />
        )}

        <MembersTable
          members={paginatedMembers}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getStatusStyle={getStatusStyle}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", gap: "12px", flexWrap: "wrap" }}>
          <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
            Showing {showingFrom}-{showingTo} of {filteredMembers.length}
          </p>
          <Pagination activePage={activePage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
        </div>

        {viewMember !== null && (
          <div className="members-modal-backdrop" role="dialog" aria-modal="true" aria-label="Member details">
            <div className="members-modal-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <h3 style={{ margin: 0 }}>Member details</h3>
                <button type="button" className="btn" onClick={() => setViewMember(null)} style={{ background: "white", border: "1px solid #cbd5e1" }}>
                  Close
                </button>
              </div>
              <div style={{ marginBottom: 12 }}><strong>Name:</strong> {viewMember.name}</div>
              <div style={{ marginBottom: 12 }}><strong>Email:</strong> {viewMember.email}</div>
              <div style={{ marginBottom: 12 }}><strong>Phone:</strong> {viewMember.phone}</div>
              <div style={{ marginBottom: 12 }}>
                <strong>Status:</strong>{" "}
                <span style={getStatusStyle(viewMember.status)}>{viewMember.status}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Members;
