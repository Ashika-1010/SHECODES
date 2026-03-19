import { REPORT_CASES } from '../../data/mockData';

const STATUS_COLORS = {
  FILED:    'var(--c3)',
  PENDING:  'var(--c4)',
  APPROVED: 'var(--c1)',
  REVIEW:   'var(--c2)',
};

export default function CaseTable() {
  return (
    <div className="rep-tbl">
      <div className="rt-hd">
        <span className="rtc">CASE ID</span>
        <span className="rtc">TYPOLOGY</span>
        <span className="rtc">AMOUNT</span>
        <span className="rtc">STATUS</span>
        <span className="rtc">FILED</span>
      </div>
      {REPORT_CASES.map(r => (
        <div className="rt-row" key={r.id}>
          <span className="rtc" style={{ color:'var(--c1)', fontFamily:"'Share Tech Mono',monospace" }}>Case {r.id}</span>
          <span className="rtc">{r.typology}</span>
          <span className="rtc" style={{ fontFamily:"'Share Tech Mono',monospace" }}>{r.amt}</span>
          <span className="rtc" style={{ color: STATUS_COLORS[r.status] }}>{r.status}</span>
          <span className="rtc">{r.filed}</span>
        </div>
      ))}
    </div>
  );
}
