export default function MemberDetailsModal({ member, onClose }) {
  if (!member) return null;

  return (
    <div className="members-modal-backdrop" role="dialog" aria-modal="true" aria-label="Member details" onClick={onClose}>
      <div className="members-modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="members-modal-card__header">
          <h3>Member details</h3>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="members-detail-list">
          <div><span className="members-detail-label">Name</span><span>{member.name}</span></div>
          <div><span className="members-detail-label">Email</span><span>{member.email}</span></div>
          <div><span className="members-detail-label">Phone</span><span>{member.phone}</span></div>
          <div>
            <span className="members-detail-label">Status</span>
            <span className={`status-badge ${member.status === "Active" ? "status-badge--active" : "status-badge--inactive"}`}>{member.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
