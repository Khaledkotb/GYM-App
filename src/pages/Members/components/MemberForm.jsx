export default function MemberForm({
  newMember,
  editingId,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <>
      <style>{`
        .member-form-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .member-form-label {
          display: block;
        }

        .member-form-label span {
          display: block;
          font-size: 12px;
          margin-bottom: 4px;
        }

        .member-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          flex-wrap: wrap;
        }

        .member-form-actions .btn {
          min-width: 110px;
        }

        @media (max-width: 640px) {
          .member-form-actions {
            flex-direction: column-reverse;
          }

          .member-form-actions .btn {
            width: 100%;
            min-width: 0;
          }
        }
      `}</style>

      <form onSubmit={onSubmit} className="members-card member-form-card">
        <h3 style={{ margin: 0 }}>{editingId ? "Edit Member" : "Add New Member"}</h3>

        <label className="member-form-label">
          <span className="muted">Name</span>
          <input type="text" placeholder="Name" value={newMember.name} onChange={(e) => onChange({ ...newMember, name: e.target.value })} className="members-input" aria-label="Member name" minLength={2} required />
        </label>

        <label className="member-form-label">
          <span className="muted">Email</span>
          <input type="email" placeholder="Email" value={newMember.email} onChange={(e) => onChange({ ...newMember, email: e.target.value })} className="members-input" aria-label="Member email" required />
        </label>

        <label className="member-form-label">
          <span className="muted">Phone</span>
          <input type="tel" placeholder="Phone" value={newMember.phone} onChange={(e) => onChange({ ...newMember, phone: e.target.value })} className="members-input" aria-label="Member phone" pattern="^\\+?[0-9\\s()-]{7,15}$" required />
        </label>

        <label className="member-form-label">
          <span className="muted">Expiry</span>
          <input type="date" placeholder="Expiry" value={newMember.expiry || ""} onChange={(e) => onChange({ ...newMember, expiry: e.target.value })} className="members-input" aria-label="Membership expiry" required />
        </label>

        <div style={{ fontSize: 12, color: "#64748b" }}>
          Status is calculated automatically from the expiry date.
        </div>

        <div className="member-form-actions">
          <button type="submit" className="btn btn-success" aria-label={editingId ? "Update member" : "Save member"}>{editingId ? "Update" : "Save"}</button>
          {onCancel && (
            <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
          )}
        </div>
      </form>
    </>
  );
}
