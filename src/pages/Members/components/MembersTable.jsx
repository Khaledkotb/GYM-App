export default function MembersTable({ members, onView, onEdit, onDelete, getStatusStyle }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        className="members-table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
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
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => onView(member)}
                    aria-label={`View ${member.name}`}
                    style={{ marginRight: 10 }}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => onEdit(member)}
                    aria-label={`Edit ${member.name}`}
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(member.id)}
                    aria-label={`Delete ${member.name}`}
                  >
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
    </div>
  );
}
