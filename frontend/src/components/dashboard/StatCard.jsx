export default function StatCard({ variant, label, value, change, valueColor }) {
  return (
    <div className={`sc ${variant}`}>
      <div className="sc-lbl">{label}</div>
      <div className="sc-num" style={{ color: valueColor }}>{value}</div>
      <div className="sc-chg">{change}</div>
    </div>
  );
}
