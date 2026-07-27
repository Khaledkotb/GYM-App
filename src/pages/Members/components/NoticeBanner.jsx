export default function NoticeBanner({ notice }) {
  if (!notice) return null;

  const className = `members-notice ${notice.type === "error" ? "members-notice--error" : "members-notice--success"}`;

  return (
    <div className={className}>
      <strong>{notice.title || (notice.type === "error" ? "Attention" : "Success")}</strong>
      <div style={{ marginTop: 4 }}>{notice.message}</div>
    </div>
  );
}
