import { memo } from "react";

const MembersTable = ({ members, onView, onEdit, onDelete, getStatusStyle }) => {
  const renderMemberRows = () =>
    members.map((member) => {
      const diff = member.expiry ? Date.parse(member.expiry) - Date.now() : NaN;
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      const daysLeft = member.expiry
        ? isNaN(days)
          ? "-"
          : days < 0
          ? "Expired"
          : `${days} day${days === 1 ? "" : "s"}`
        : "-";

      return (
        <div key={member.id} className="members-mobile-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <strong>{member.name}</strong>
            <span style={getStatusStyle(member.status)}>{member.status}</span>
          </div>
          <div className="members-mobile-meta">
            <span><strong>Email:</strong> {member.email}</span>
            <span><strong>Phone:</strong> {member.phone}</span>
            <span><strong>Expiry:</strong> {member.expiry || "-"}</span>
            <span><strong>Days left:</strong> {daysLeft}</span>
          </div>
          <div className="members-mobile-actions">
            <button type="button" className="btn btn-info" onClick={() => onView(member)} aria-label={`View ${member.name}`}>
              View
            </button>
            <button type="button" className="btn btn-warning" onClick={() => onEdit(member)} aria-label={`Edit ${member.name}`}>
              Edit
            </button>
            <button type="button" className="btn btn-danger" onClick={() => onDelete(member.id)} aria-label={`Delete ${member.name}`}>
              Delete
            </button>
          </div>
        </div>
      );
    });

  return (
    <>
      <style>{`
        .members-table-wrapper {
          overflow-x: auto;
        }

        .members-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 8px;
          overflow: hidden;
        }

        .members-mobile-list {
          display: none;
        }

        .members-mobile-card {
          display: none;
        }

        @media (max-width: 768px) {
          .members-table {
            display: none;
          }

          .members-mobile-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .members-mobile-card {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 14px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            background: white;
          }

          .members-mobile-meta {
            display: flex;
            flex-direction: column;
            gap: 4px;
            color: #334155;
            font-size: 14px;
          }

          .members-mobile-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .members-mobile-actions .btn {
            flex: 1 1 110px;
          }
        }
      `}</style>

      <div className="members-table-wrapper">
        <table className="members-table">
          <thead>
            <tr style={{ background: "#e2e8f0" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Phone</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Expiry</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Days left</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => {
              const diff = member.expiry ? Date.parse(member.expiry) - Date.now() : NaN;
              const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
              const daysLeft = member.expiry
                ? isNaN(days)
                  ? "-"
                  : days < 0
                  ? "Expired"
                  : `${days} day${days === 1 ? "" : "s"}`
                : "-";

              return (
                <tr key={member.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px", fontWeight: 700 }}>{member.name}</td>
                  <td style={{ padding: "12px" }}>{member.email}</td>
                  <td style={{ padding: "12px" }}>{member.phone}</td>
                  <td style={{ padding: "12px" }}>{member.expiry || "-"}</td>
                  <td style={{ padding: "12px" }}>{daysLeft}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={getStatusStyle(member.status)}>{member.status}</span>
                  </td>
                  <td style={{ padding: "12px", whiteSpace: "nowrap" }} className="members-actions-row">
                    <button type="button" className="btn btn-info" onClick={() => onView(member)} aria-label={`View ${member.name}`} style={{ marginRight: 10 }}>
                      View
                    </button>
                    <button type="button" className="btn btn-warning" onClick={() => onEdit(member)} aria-label={`Edit ${member.name}`} style={{ marginRight: 10 }}>
                      Edit
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => onDelete(member.id)} aria-label={`Delete ${member.name}`}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

            {members.length === 0 && (
              <tr>
                <td colSpan="7" style={{ padding: "18px", textAlign: "center", color: "#64748b" }}>
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="members-mobile-list">
          {members.length > 0 ? renderMemberRows() : <div style={{ padding: "18px", textAlign: "center", color: "#64748b" }}>No members found.</div>}
        </div>
      </div>
    </>
  );
};

export default memo(MembersTable);
