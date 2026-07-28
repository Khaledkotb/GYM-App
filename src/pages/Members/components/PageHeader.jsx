export default function PageHeader({ title, subtitle, count, children }) {
  return (
    <div className="members-page-header">
      <div className="members-page-header__text">
        <h1 className="members-page-title">{title}</h1>
        {subtitle ? <p className="members-page-subtitle">{subtitle}</p> : null}
        {count !== undefined ? <p className="members-page-count">{count} members</p> : null}
      </div>
      {children ? <div className="members-page-header__actions">{children}</div> : null}
    </div>
  );
}
