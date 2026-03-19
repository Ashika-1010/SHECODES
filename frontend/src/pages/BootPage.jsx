import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MSGS = [
  'INITIALISING KERNEL...',
  'LOADING NEURAL MODELS...',
  'CONNECTING TO GRAPH DB...',
  'ESTABLISHING SECURE CHANNEL...',
  'SYSTEM ONLINE',
];

export default function BootPage() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(MSGS[0]);
  const navigate = useNavigate();
  const done = useRef(false);

  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(100, p + 2); // 50 steps × 40ms = 2s
      setProgress(p);
      const step = Math.floor(p / (100 / (MSGS.length - 1)));
      if (step < MSGS.length) setStatus(MSGS[step]);
      if (p >= 100) {
        clearInterval(iv);
        setStatus(MSGS[MSGS.length - 1]);
        if (!done.current) {
          done.current = true;
          setTimeout(() => navigate('/landing'), 400);
        }
      }
    }, 40);
    return () => clearInterval(iv);
  }, [navigate]);

  return (
    <div className="boot-screen">
      <div className="boot-logo">UNION<span>TRACE</span></div>
      <div className="boot-sub">UNIONTRACE OS BOOTING...</div>
      <div className="boot-bar-wrap">
        <div className="boot-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="boot-status">{status}</div>
    </div>
  );
}
