export default function Filters({ searchTerm, statusFilter, onSearch, onStatusChange }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        marginBottom: "20px",
        alignItems: "center",
      }}
    >
      <label style={{ display: "block", flex: "1 1 280px" }}>
        <span className="muted" style={{ display: "none" }}>
          Search members
        </span>
        <input
          type="text"
          placeholder="Search members"
          value={searchTerm}
          onChange={onSearch}
          aria-label="Search members"
          className="members-input"
        />
      </label>

      <label style={{ display: "block", minWidth: "180px" }}>
        <span className="muted" style={{ display: "none" }}>
          Filter by status
        </span>
        <select
          value={statusFilter}
          onChange={onStatusChange}
          aria-label="Filter members by status"
          className="members-select"
        >
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
        </select>
      </label>
    </div>
  );
}
