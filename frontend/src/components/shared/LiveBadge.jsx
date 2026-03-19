export default function LiveBadge({ label = 'LIVE' }) {
  return (
    <div className="tb-live">
      <span className="tb-live-dot" />
      {label}
    </div>
  );
}
