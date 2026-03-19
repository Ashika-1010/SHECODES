import { useEffect } from 'react';
import ReportCards from '../../components/reports/ReportCards';
import CaseTable   from '../../components/reports/CaseTable';

export default function ReportsPage({ onMount }) {
  useEffect(() => { onMount?.(); }, []);
  return (
    <div className="app-page show">
      <div className="rep-body">
        <ReportCards />
        <div className="rep-actions">
          <GenerateSTRButton />
        </div>
        <CaseTable />
      </div>
    </div>
  );
}

function GenerateSTRButton() {
  function handleClick(e) {
    const el = e.currentTarget;
    el.textContent = 'GENERATING...';
    setTimeout(() => { el.textContent = 'STR GENERATED — CASE #2847'; }, 1500);
  }
  return (
    <div className="str-btn" onClick={handleClick}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="12" height="12" rx="1.5" stroke="var(--c1)" strokeWidth="1.2"/>
        <line x1="4" y1="7" x2="10" y2="7" stroke="var(--c1)"/>
        <line x1="7" y1="4" x2="7" y2="10" stroke="var(--c1)"/>
      </svg>
      GENERATE NEW STR REPORT
    </div>
  );
}
