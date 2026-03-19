import { useState, useEffect, useRef } from 'react';
import LiveBadge from '../shared/LiveBadge';

const FLASH_MSGS = ['NEW CRITICAL ALERT', 'ROUND-TRIP DETECTED', 'LAYERING SEQUENCE'];

export default function Topbar({ title }) {
  const [alertLabel, setAlertLabel] = useState('7 CRITICAL ALERTS');
  const [flashing, setFlashing]     = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const msg = FLASH_MSGS[Math.floor(Math.random() * FLASH_MSGS.length)];
      setAlertLabel(msg);
      setFlashing(true);
      setTimeout(() => {
        setAlertLabel('7 CRITICAL ALERTS');
        setFlashing(false);
      }, 4000);
    }, 30000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="topbar">
      <div className="tb-title">{title}</div>
      <div className="tb-search">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <circle cx="5.5" cy="5.5" r="4" stroke="var(--t3)" strokeWidth="1.2"/>
          <line x1="9" y1="9" x2="12" y2="12" stroke="var(--t3)" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        <input placeholder="Search accounts, cases..." />
      </div>
      <LiveBadge label="LIVE MONITORING" />
      <div
        className="tb-alert-btn"
        style={flashing ? { background:'rgba(255,45,85,0.3)',color:'#fff',boxShadow:'0 0 15px rgba(255,45,85,0.4)' } : {}}
      >
        {alertLabel}
      </div>
    </div>
  );
}
