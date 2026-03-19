import { useState, useEffect } from 'react';
import { ALERTS } from '../../data/mockData';
import LiveBadge from '../shared/LiveBadge';

const TYPES = ['Structuring', 'Round-Tripping', 'Rapid Layering', 'Profile Mismatch'];

export default function AlertFeed() {
  const [alerts, setAlerts] = useState([...ALERTS]);

  useEffect(() => {
    const iv = setInterval(() => {
      const nn = {
        id:  `ALT-${Math.floor(Math.random() * 9000 + 1000)}`,
        type: TYPES[Math.floor(Math.random() * TYPES.length)],
        col:  Math.random() > 0.5 ? 'var(--c2)' : 'var(--c4)',
        amt: `₹${(Math.random() * 50).toFixed(1)}L`,
        t:   'Just now',
      };
      setAlerts(prev => [nn, ...prev.slice(0, 4)]);
    }, 20000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="dc" style={{ flex: 1 }}>
      <div className="dc-hd">
        <span className="dc-ttl">LIVE ALERT FEED</span>
        <LiveBadge label="LIVE" />
      </div>
      <div className="dc-body" style={{ overflowY:'auto', maxHeight:210 }}>
        {alerts.map(a => (
          <div className="al-row" key={a.id}>
            <div className="al-dot" style={{ background: a.col }} />
            <div style={{ flex: 1 }}>
              <div className="al-id">{a.id}</div>
              <div className="al-type">{a.type}</div>
            </div>
            <div className="al-right">
              <div className="al-amt" style={{ color: a.col }}>{a.amt}</div>
              <div className="al-time">{a.t}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
