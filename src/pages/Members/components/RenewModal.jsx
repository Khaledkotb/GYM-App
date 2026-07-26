export default function RenewModal({
  isOpen,
  title,
  expiry,
  paymentStatus,
  extendDays,
  onExpiryChange,
  onPaymentChange,
  onDaysChange,
  onClose,
  onSubmit,
  mode,
}) {
  if (!isOpen) return null;

  return (
    <div className="members-modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <form onSubmit={onSubmit} className="members-modal-card">
        <h3>{title}</h3>
        {mode === "renew" ? (
          <>
            <label style={{ display: "block", marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "#475569", marginBottom: 6 }}>New expiry</div>
              <input type="date" value={expiry} onChange={onExpiryChange} className="members-input" />
            </label>
            <label style={{ display: "block", marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: "#475569", marginBottom: 6 }}>Payment status</div>
              <select value={paymentStatus} onChange={onPaymentChange} className="members-select">
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </label>
          </>
        ) : (
          <label style={{ display: "block", marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "#475569", marginBottom: 6 }}>Extend by days</div>
            <input type="number" min="1" value={extendDays} onChange={onDaysChange} className="members-input" />
          </label>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
          <button type="button" className="btn" onClick={onClose} style={{ background: "white", border: "1px solid #cbd5e1" }}>Cancel</button>
          <button type="submit" className="btn btn-success">{mode === "renew" ? "Save" : "Apply extension"}</button>
        </div>
      </form>
    </div>
  );
}
