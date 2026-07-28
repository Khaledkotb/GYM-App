export default function MemberEmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <div className="members-empty-state">
      <div className="members-empty-state__icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {onAction && actionLabel ? (
        <button type="button" className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
