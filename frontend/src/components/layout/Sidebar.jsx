import { useNavigate } from 'react-router-dom';

const NAV = [
  {
    id: 'graph', label: 'Threat Graph', badge: '7',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="3" cy="5" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="15" cy="5" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="3" cy="13" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="15" cy="13" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="6.5" y1="8" x2="4.5" y2="6.5" stroke="currentColor" strokeWidth="1"/>
        <line x1="11.5" y1="8" x2="13.5" y2="6.5" stroke="currentColor" strokeWidth="1"/>
        <line x1="6.5" y1="10" x2="4.5" y2="11.5" stroke="currentColor" strokeWidth="1"/>
        <line x1="11.5" y1="10" x2="13.5" y2="11.5" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    id: 'dash', label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="10" y="2" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="10" y="8" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="2" y="11" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    id: 'invest', label: 'Investigate',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="12.5" y1="12.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="6" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="1"/>
        <line x1="8" y1="6" x2="8" y2="10" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    id: 'reports', label: 'Reports',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="2" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="6" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1"/>
        <line x1="6" y1="9" x2="12" y2="9" stroke="currentColor" strokeWidth="1"/>
        <line x1="6" y1="12" x2="10" y2="12" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
  },
];

export default function Sidebar({ activePage, onNavigate }) {
  const navigate = useNavigate();

  function go(id) {
    onNavigate(id);
    navigate(`/app/${id}`);
  }

  return (
    <div className="sidebar">
      <div className="sb-logo">
        <div className="sb-logo-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <polygon points="8,1 15,4.5 15,11.5 8,15 1,11.5 1,4.5" stroke="var(--c1)" strokeWidth="1.2" fill="none"/>
            <circle cx="8" cy="8" r="2.5" fill="var(--c1)"/>
          </svg>
        </div>
        <div className="sb-logo-txt">UNIONTRACE</div>
      </div>

      <div className="sb-nav">
        {NAV.map(n => (
          <div
            key={n.id}
            className={`sbn${activePage === n.id ? ' active' : ''}`}
            onClick={() => go(n.id)}
          >
            <div className="sbn-icon">{n.icon}</div>
            <span className="sbn-lbl">{n.label}</span>
            {n.badge && <span className="sbn-bdg">{n.badge}</span>}
          </div>
        ))}
      </div>

      <div className="sb-bottom">
        <div className="sb-av">AK</div>
        <div className="sb-uinfo">
          <div className="sb-uname">Arjun Kumar</div>
          <div className="sb-urole">SR. INVESTIGATOR</div>
        </div>
      </div>
    </div>
  );
}
