import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function doLogin() {
    if (login(user, pass)) {
      setErr(false);
      navigate('/app/graph');
    } else {
      setErr(true);
    }
  }

  function fillDemo() {
    setUser('admin');
    setPass('uniontrace');
  }

  return (
    <div className="login-page">
      <div className="login-bg-grid" />
      <div className="back-lnk" onClick={() => navigate('/landing')}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <polyline points="9,2 4,7 9,12" stroke="#3d6478" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
        BACK
      </div>

      <div className="login-split">
        <div className="login-left">
          <div className="ll-tag">UNIONTRACE INTELLIGENCE PLATFORM v2.1</div>
          <h2 className="ll-h">Fraud doesn't<br/>wait. <span>Neither</span><br/>should you.</h2>
          <p className="ll-sub">Real-time fund flow tracking across every account, branch, and channel. Five fraud typologies. One unified dashboard. FIU-IND compliant reporting.</p>
          <div className="ll-feats">
            {[
              { icon: 'c1', label: '3D Transaction Graph', desc: '— every hop visualised live' },
              { icon: 'c5', label: 'AI Investigator Chat', desc: '— ask anything, get graph answers' },
              { icon: 'c4', label: 'One-click FIU-IND STR', desc: '— auto-generate compliant reports' },
              { icon: 'c3', label: 'Real-time risk scoring', desc: '— 6 ML models, instant alerts' },
            ].map((f, i) => (
              <div className="lf" key={i}>
                <div className="lf-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="var(--c1)" strokeWidth="1.2"/>
                    <polyline points="5,8 7,10 11,6" stroke="var(--c1)" strokeWidth="1.2" fill="none"/>
                  </svg>
                </div>
                <div className="lf-text"><strong>{f.label}</strong>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="login-right">
          <div className="lr-logo">UNION<span>TRACE</span></div>
          <div className="lr-sub">SECURE ACCESS PORTAL</div>
          <div className="sec-badge">
            <div className="sb-dot" />
            <span className="sb-txt">256-BIT ENCRYPTED · RBI COMPLIANT</span>
          </div>
          <div className="fg">
            <label>OFFICER ID / EMAIL</label>
            <input
              type="text"
              placeholder="officer@bank.com"
              value={user}
              onChange={e => setUser(e.target.value)}
            />
          </div>
          <div className="fg">
            <label>PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && doLogin()}
            />
          </div>
          <div className={`login-err${err ? ' show' : ''}`}>
            INVALID CREDENTIALS — TRY: admin / uniontrace
          </div>
          <button className="login-btn" onClick={doLogin}>ACCESS DASHBOARD</button>
          <div className="login-hint">
            Demo: <span onClick={fillDemo}>admin / uniontrace</span>
          </div>
        </div>
      </div>
    </div>
  );
}
