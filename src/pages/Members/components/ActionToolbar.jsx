export default function ActionToolbar({ onToggleForm, showForm }) {
  return (
    <div className="members-toolbar">
      <div className="toolbar-group">
        <button
          type="button"
          onClick={onToggleForm}
          className="btn btn-primary"
          aria-pressed={showForm}
          aria-label={showForm ? "Cancel add member" : "Add member"}
        >
          {showForm ? "Cancel" : "+ Add Member"}
        </button>
      </div>
    </div>
  );
}
