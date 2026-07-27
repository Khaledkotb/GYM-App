export default function ConfirmDeleteModal({ member, onCancel, onConfirm }) {
  if (!member) return null;

  return (
    <div className="members-modal-backdrop" role="dialog" aria-modal="true" aria-label="Confirm delete" onClick={onCancel}>
      <div className="members-modal-card" onClick={(event) => event.stopPropagation()}>
        <h3>Delete member?</h3>
        <p className="members-modal-copy">
          Are you sure you want to delete <strong>{member.name}</strong>? This action cannot be undone.
        </p>
        <div className="members-modal-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
