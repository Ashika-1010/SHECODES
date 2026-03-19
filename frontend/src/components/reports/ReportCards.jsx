const CARDS = [
  {
    col: 'var(--c1)',
    title: 'FIU-IND STR REPORT',
    desc: 'Suspicious Transaction Report in prescribed RBI format. Auto-populated from case data.',
    status: 'READY TO GENERATE',
    statusCol: 'var(--c3)',
  },
  {
    col: 'var(--c5)',
    title: 'EVIDENCE PACKAGE',
    desc: 'ZIP bundle: graph PNG, raw TX logs, ML scores, KYC mismatch analysis and timeline replay.',
    status: '3 PACKAGES READY',
    statusCol: 'var(--c4)',
  },
  {
    col: 'var(--c4)',
    title: 'NETWORK ANALYTICS',
    desc: 'Graph centrality, betweenness scores, and typology fingerprints for all flagged account clusters.',
    status: 'PROCESSING',
    statusCol: 'var(--c1)',
  },
];

export default function ReportCards() {
  return (
    <div className="rep-cards-grid">
      {CARDS.map(c => (
        <div className="rc" key={c.title}>
          <div className="rc-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="2" width="14" height="14" rx="2" stroke={c.col} strokeWidth="1.2"/>
              <line x1="5" y1="6" x2="13" y2="6" stroke={c.col}/>
              <line x1="5" y1="9" x2="13" y2="9" stroke={c.col}/>
              <line x1="5" y1="12" x2="9" y2="12" stroke={c.col}/>
            </svg>
          </div>
          <div className="rc-title">{c.title}</div>
          <div className="rc-desc">{c.desc}</div>
          <div className="rc-status" style={{ color: c.statusCol }}>{c.status}</div>
        </div>
      ))}
    </div>
  );
}
