export default function ActionToolbar({ onToggleForm, showForm, isAddDisabled = false, disabledReason }) {
  const isDisabled = isAddDisabled && !showForm;

  return (
    <>
      <style>{`
        .members-toolbar {
          display: flex;
          justify-content: flex-end;
        }

        .toolbar-group {
          display: flex;
          gap: 8px;
        }

        @media (max-width: 640px) {
          .members-toolbar {
            width: 100%;
            justify-content: stretch;
          }

          .toolbar-group {
            width: 100%;
          }

          .toolbar-group .btn {
            flex: 1;
          }
        }
      `}</style>

      <div className="members-toolbar">
        <div className="toolbar-group">
          <button
            type="button"
            onClick={onToggleForm}
            className="btn btn-primary"
            aria-pressed={showForm}
            aria-label={showForm ? "Cancel add member" : "Add member"}
            disabled={isDisabled}
            title={isDisabled ? disabledReason : undefined}
          >
            {showForm ? "Cancel" : "+ Add Member"}
          </button>
        </div>
      </div>
    </>
  );
}
