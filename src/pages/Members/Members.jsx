import { useMemo, useState, useEffect, useCallback } from "react";
import MainLayout from "../../components/layout/MainLayout";
import ActionToolbar from "./components/ActionToolbar";
import Filters from "./components/Filters";
import MemberForm from "./components/MemberForm";
import MembersTable from "./components/MembersTable";
import Pagination from "./components/Pagination";
import PageHeader from "./components/PageHeader";
import NoticeBanner from "./components/NoticeBanner";
import MemberEmptyState from "./components/MemberEmptyState";
import MemberDetailsModal from "./components/MemberDetailsModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

const MEMBERS_PER_PAGE = 5;
const PLAN_LIMIT = 12;

const initialMembers = [
  { id: 1, name: "Khaled", email: "khaled@gmail.com", phone: "+201282708833", status: "Active", expiry: "2026-12-31" },
  { id: 2, name: "Ahmed", email: "ahmed@gmail.com", phone: "+201090801144", status: "Inactive", expiry: "2023-06-30" },
  { id: 3, name: "Mona", email: "mona@gmail.com", phone: "+201001112233", status: "Active", expiry: "2026-09-01" },
  { id: 4, name: "Omar", email: "omar@gmail.com", phone: "+201122334455", status: "Active", expiry: "2026-11-15" },
  { id: 5, name: "Sara", email: "sara@gmail.com", phone: "+201155667788", status: "Inactive", expiry: "2024-01-10" },
  { id: 6, name: "Youssef", email: "youssef@gmail.com", phone: "+201022334455", status: "Active", expiry: "2027-02-20" },
  { id: 7, name: "Nour", email: "nour@gmail.com", phone: "+201033445566", status: "Active", expiry: "2026-08-30" },
  { id: 8, name: "Hana", email: "hana@gmail.com", phone: "+201044556677", status: "Inactive", expiry: "2022-12-01" },
  { id: 9, name: "Mostafa", email: "mostafa@gmail.com", phone: "+201055667788", status: "Active", expiry: "2026-10-05" },
  { id: 10, name: "Laila", email: "laila@gmail.com", phone: "+201066778899", status: "Active", expiry: "2026-07-30" },
  { id: 11, name: "Tarek", email: "tarek@gmail.com", phone: "+201077889900", status: "Active", expiry: "2026-12-01" },
  { id: 12, name: "Lelo", email: "lelo@gmail.com", phone: "+201033383892", status: "Inactive", expiry: "2024-04-20" },
];

const emptyMember = { name: "", email: "", phone: "", expiry: "" };

const normalizeDateInput = (value) => {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return null;
  }
  return date;
};

const getStatusFromExpiry = (expiry, fallback = "Active") => {
  if (!expiry) return fallback;
  const parsedExpiry = normalizeDateInput(expiry);
  if (!parsedExpiry) return fallback;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return parsedExpiry < today ? "Inactive" : "Active";
};

const validateMemberData = (member) => {
  const errors = [];
  const name = String(member.name || "").trim();
  const email = String(member.email || "").trim().toLowerCase();
  const phone = String(member.phone || "").trim();
  const expiry = String(member.expiry || "").trim();

  if (!name || name.length < 2) {
    errors.push("Please enter a valid name.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (!/^\+?[0-9\s()-]{7,15}$/.test(phone)) {
    errors.push("Please enter a valid phone number.");
  }

  if (!expiry) {
    errors.push("Please provide an expiry date for the membership.");
  } else if (!normalizeDateInput(expiry)) {
    errors.push("Please provide a valid expiry date.");
  }

  return {
    errors,
    cleanedMember: {
      name,
      email,
      phone,
      expiry,
    },
  };
};

const normalizeMembers = (memberList) =>
  memberList.map((member) => ({
    ...member,
    status: getStatusFromExpiry(member.expiry, member.status || "Active"),
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    writeStorage("gymsys_members", members);
  }, [members]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(null), 5000);
    return () => clearTimeout(timeout);
  }, [notice]);

  const normalizedMembers = useMemo(
    () =>
      members.map((member) => ({
        ...member,
        status: getStatusFromExpiry(member.expiry, member.status || "Active"),
      })),
    [members]
  );

  const filteredMembers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return normalizedMembers.filter((member) => {
      const matchesSearch = `${member.name} ${member.email} ${member.phone}`.toLowerCase().includes(normalizedSearch);
      const matchesStatus = statusFilter === "All" || member.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [normalizedMembers, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / MEMBERS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const pageStart = (activePage - 1) * MEMBERS_PER_PAGE;
  const paginatedMembers = filteredMembers.slice(pageStart, pageStart + MEMBERS_PER_PAGE);
  const showingFrom = filteredMembers.length === 0 ? 0 : pageStart + 1;
  const showingTo = Math.min(pageStart + MEMBERS_PER_PAGE, filteredMembers.length);

  const resetForm = useCallback(() => {
    setNewMember(emptyMember);
    setEditingId(null);
    setShowForm(false);
  }, []);

  const handleToggleForm = useCallback(() => {
    if (showForm) {
      resetForm();
      return;
    }
    setShowForm(true);
  }, [resetForm, showForm]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleStatusFilter = useCallback((e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleSave = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateMemberData(newMember);
    if (validation.errors.length > 0) {
      setNotice({ type: "error", title: "Validation failed", message: validation.errors[0] });
      setIsSubmitting(false);
      return;
    }

    const cleanedMember = {
      name: validation.cleanedMember.name,
      email: validation.cleanedMember.email,
      phone: validation.cleanedMember.phone,
      expiry: validation.cleanedMember.expiry,
      status: getStatusFromExpiry(validation.cleanedMember.expiry, "Active"),
    };

    const emailExists = members.some((m) => m.email.toLowerCase() === cleanedMember.email && m.id !== editingId);
    if (emailExists) {
      setNotice({ type: "error", title: "Duplicate email", message: "A member with this email already exists." });
      setIsSubmitting(false);
      return;
    }

    if (editingId !== null) {
      setMembers((prev) => prev.map((m) => (m.id === editingId ? { ...m, ...cleanedMember } : m)));
      setNotice({ type: "success", title: "Updated", message: "Member updated successfully." });
    } else {
      if (members.length >= PLAN_LIMIT) {
        setNotice({ type: "error", title: "Limit reached", message: `Plan limit reached. You can only add up to ${PLAN_LIMIT} members.` });
        setIsSubmitting(false);
        return;
      }

      const memberToAdd = { id: Date.now(), ...cleanedMember };
      setMembers((prev) => [...prev, memberToAdd]);
      setCurrentPage(Math.max(1, Math.ceil((members.length + 1) / MEMBERS_PER_PAGE)));
      setNotice({ type: "success", title: "Added", message: "Member added successfully." });
    }

    resetForm();
    window.setTimeout(() => setIsSubmitting(false), 250);
  }, [editingId, members, newMember, resetForm]);

  const handleEdit = useCallback((member) => {
    setNewMember({
      name: member.name,
      email: member.email,
      phone: member.phone,
      expiry: member.expiry || "",
    });
    setEditingId(member.id);
    setShowForm(true);
    setNotice(null);
  }, []);

  const handleDelete = useCallback((id) => {
    const memberToDelete = members.find((member) => member.id === id);
    if (!memberToDelete) return;
    setDeleteTarget(memberToDelete);
  }, [members]);

  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    setMembers((prev) => prev.filter((member) => member.id !== deleteTarget.id));
    setNotice({ type: "success", title: "Deleted", message: "Member deleted successfully." });
    setDeleteTarget(null);
  }, [deleteTarget]);

  const cancelDelete = useCallback(() => setDeleteTarget(null), []);

  const handleView = useCallback((member) => setViewMember(member), []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setStatusFilter("All");
    setCurrentPage(1);
  }, []);

  const getStatusStyle = useCallback((status) => ({
    background: status === "Active" ? "#dcfce7" : "#fee2e2",
    color: status === "Active" ? "#166534" : "#991b1b",
  }), []);

  return (
    <MainLayout>
      {(isLoading || isSubmitting) && (
        <div className="members-loading-overlay" aria-live="polite">
          <div className="members-spinner" aria-label="Loading" />
        </div>
      )}

      <div className="members-card" style={{ padding: "28px", background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)" }}>
        <PageHeader title="Members" subtitle="Manage your gym members and subscriptions." count={members.length}>
          <ActionToolbar onToggleForm={handleToggleForm} showForm={showForm} />
        </PageHeader>

        <NoticeBanner notice={notice} />

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

        {members.length === 0 ? (
          <MemberEmptyState
            icon="👤"
            title="No members yet"
            description="Start by adding your first member to build your roster."
            actionLabel="Add your first member"
            onAction={() => setShowForm(true)}
          />
        ) : filteredMembers.length === 0 ? (
          <MemberEmptyState
            icon="🔎"
            title="No results found"
            description="Try a different search term or clear the filters to see all members."
            actionLabel="Clear filters"
            onAction={clearFilters}
          />
        ) : (
          <MembersTable
            members={paginatedMembers}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            getStatusStyle={getStatusStyle}
          />
        )}

        {members.length > 0 && filteredMembers.length > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", gap: "12px", flexWrap: "wrap" }}>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
              Showing {showingFrom}-{showingTo} of {filteredMembers.length}
            </p>
            <Pagination activePage={activePage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
          </div>
        )}

        {viewMember !== null && <MemberDetailsModal member={viewMember} onClose={() => setViewMember(null)} />}

        {deleteTarget && <ConfirmDeleteModal member={deleteTarget} onCancel={cancelDelete} onConfirm={confirmDelete} />}
      </div>
    </MainLayout>
  );
}

export default Members;
