export default function MemberForm({
  newMember,
  editingId,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="members-card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <h3 style={{ margin: 0 }}>{editingId ? "Edit Member" : "Add New Member"}</h3>

      <label style={{ display: "block" }}>
        <span className="muted" style={{ fontSize: 12 }}>Name</span>
        <input type="text" placeholder="Name" value={newMember.name} onChange={(e) => onChange({ ...newMember, name: e.target.value })} className="members-input" aria-label="Member name" />
      </label>

      <label style={{ display: "block" }}>
        <span className="muted" style={{ fontSize: 12 }}>Email</span>
        <input type="email" placeholder="Email" value={newMember.email} onChange={(e) => onChange({ ...newMember, email: e.target.value })} className="members-input" aria-label="Member email" />
      </label>

      <label style={{ display: "block" }}>
        <span className="muted" style={{ fontSize: 12 }}>Phone</span>
        <input type="text" placeholder="Phone" value={newMember.phone} onChange={(e) => onChange({ ...newMember, phone: e.target.value })} className="members-input" aria-label="Member phone" />
      </label>

      <label style={{ display: "block" }}>
        <span className="muted" style={{ fontSize: 12 }}>Expiry</span>
        <input type="date" placeholder="Expiry" value={newMember.expiry || ""} onChange={(e) => onChange({ ...newMember, expiry: e.target.value })} className="members-input" aria-label="Membership expiry" />
      </label>

      <label style={{ display: "block" }}>
        <span className="muted" style={{ fontSize: 12 }}>Status</span>
        <select value={newMember.status} onChange={(e) => onChange({ ...newMember, status: e.target.value })} className="members-select" aria-label="Member status">
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
        </select>
      </label>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button type="submit" className="btn btn-success" aria-label={editingId ? "Update member" : "Save member"}>{editingId ? "Update" : "Save"}</button>
        {onCancel && (
          <button type="button" className="btn btn-outline" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>
        )}
      </div>
    </form>
  );
}
