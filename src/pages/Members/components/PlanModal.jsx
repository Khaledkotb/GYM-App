export default function PlanModal({ isOpen, onClose, onSelectPlan }) {
  if (!isOpen) return null;

  return (
    <div className="members-modal-backdrop" role="dialog" aria-modal="true" aria-label="Change plan">
      <div className="members-modal-card">
        <h3>Choose a plan</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button type="button" className="btn btn-outline" onClick={() => onSelectPlan({ name: "Starter", limit: 12 })} style={{ textAlign: "left" }}>Starter — 12 seats</button>
          <button type="button" className="btn btn-outline" onClick={() => onSelectPlan({ name: "Pro", limit: 50 })} style={{ textAlign: "left" }}>Pro — 50 seats</button>
          <button type="button" className="btn btn-outline" onClick={() => onSelectPlan({ name: "Business", limit: 200 })} style={{ textAlign: "left" }}>Business — 200 seats</button>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
          <button type="button" className="btn" onClick={onClose} style={{ background: "white", border: "1px solid #cbd5e1" }}>Close</button>
        </div>
      </div>
    </div>
  );
}
