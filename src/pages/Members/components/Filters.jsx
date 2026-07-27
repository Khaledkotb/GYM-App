export default function Filters({ searchTerm, statusFilter, onSearch, onStatusChange }) {
  return (
    <>
      <style>{`
        .filters-shell {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
          align-items: center;
        }

        .filters-search {
          display: block;
          flex: 1 1 280px;
        }

        .filters-select {
          display: block;
          min-width: 180px;
        }

        @media (max-width: 640px) {
          .filters-shell {
            flex-direction: column;
            align-items: stretch;
          }

          .filters-search,
          .filters-select {
            width: 100%;
            min-width: 0;
          }
        }
      `}</style>

      <div className="filters-shell">
        <label className="filters-search">
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

        <label className="filters-select">
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
            <option value="Inactive">Inactive</option>
          </select>
        </label>
      </div>
    </>
  );
}
