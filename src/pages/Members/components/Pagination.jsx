export default function Pagination({ activePage, totalPages, onPageChange }) {
  return (
    <div className="pagination-container">
      <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
        Showing page {activePage} of {totalPages}
      </p>

      <div className="pagination-buttons">
        <button
          type="button"
          onClick={() => onPageChange(activePage - 1)}
          disabled={activePage === 1}
          className={`pagination-button ${activePage === 1 ? "pagination-button--disabled" : ""}`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`pagination-button ${page === activePage ? "pagination-button--active" : ""}`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(activePage + 1)}
          disabled={activePage === totalPages}
          className={`pagination-button ${activePage === totalPages ? "pagination-button--disabled" : ""}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
