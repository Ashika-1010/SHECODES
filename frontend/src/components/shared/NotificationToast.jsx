import { useEffect, useRef, useState } from 'react';
import { NOTIF_MESSAGES } from '../../data/mockData';

export default function NotificationToast() {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg]         = useState(NOTIF_MESSAGES[0]);
  const idx = useRef(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setMsg(NOTIF_MESSAGES[idx.current % NOTIF_MESSAGES.length]);
      idx.current++;
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    }, 25000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className={`notif${visible ? ' show' : ''}`}>
      <div className="notif-title">NEW CRITICAL ALERT</div>
      <div className="notif-msg">{msg}</div>
    </div>
  );
}
